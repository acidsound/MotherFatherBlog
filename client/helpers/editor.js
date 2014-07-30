/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 6. 2.
 * Time: 오후 3:32
 * To change this template use File | Settings | File Templates.
 */
//penEditor = null;
mediumEditor = null;
/*
initPenEditor = function(opts){
  if(penEditor == null){
    penEditor = new Pen(opts);
  }else{
    destroyPenEditor();
    initPenEditor(opts);
  }
}
destroyPenEditor = function(){
  if(penEditor!= null){
    penEditor.destroy();
    penEditor = null;
    $('.content-menu').remove();

  }
};
*/


initMediumEditor = function(elem, type) {
  var elem = elem;
  var showAttachModal = function(editor){
    var parentElement = editor.base.getSelectedParentElement();
    var attachModalcallback = function(data, modalId){
      clearModal(modalId);
      if(data.result === "ok"){
        var attachElement = "";
        if(data.type==="ImageUrl" || data.type==="ImageUpload"){
          attachElement = "<img src="+data.url +"></img>";
          //$('#content').html($('#content').html()+imgTag);

        }else if(data.type==="YoutubeUrl"){
          attachElement = '<img alt="youtube" width="100%" name="'+data.url+'" src="http://img.youtube.com/vi/'+data.url+'/0.jpg">';
          //var youtubeTag = "<div class='embed-responsive embed-responsive-16by9'><iframe  class='embed-responsive-item' src=\"http://www.youtube.com/embed/"+data.url+ "\" frameborder=0></iframe></div>";
          //$('#content').html($('#content').html()+imgTag);
        }/*else if(data.type==="AceUrl"){
         $('#content').html($('#content').html()+"<pre>"+data.url+"</pre> <div> </div>");
         }*/
        $(parentElement).append(attachElement);
      }
    };
    throwModal({
      type:"attach",
      callback : attachModalcallback
    });
  };
  function Extension() {
    this.parent = true;
    this.button = document.createElement('button');
    this.button.className = 'medium-editor-action';
    this.button.innerText = ' ';
    $(this.button).append("<i class='fa fa-paperclip'></i>")
    this.button.onclick = this.onClick.bind(this);
  }
  Extension.prototype.getButton = function() {
    return this.button;
  };
  Extension.prototype.onClick = function() {
    showAttachModal(this);
  };

  var options = {
    anchorInputPlaceholder: 'URL을 입력하세요.',
    placeholder:"내용을 입력하세요.",
    targetBlank: true,
    firstHeader:'h1',secondHeader: 'h2',
    extensions : {
      extension: new Extension()
    }
  };
  if(type =="post"){
    options.buttons = ['quote', 'header2', 'pre' , 'orderedlist', 'anchor', 'bold', 'italic', 'strikethrough', 'extension'];
  }else if(type == "comment"){
    options.buttons = ['pre', 'orderedlist', 'anchor', 'bold', 'italic', 'extension'];
  }
  if(mediumEditor == null){
    mediumEditor = new MediumEditor(elem,options);
  }else{
    destroyMediumEditor();
    initMediumEditor(elem, options);
  }
}
destroyMediumEditor = function(){
  if(mediumEditor!= null){
    $("#medium-editor-toolbar-"+mediumEditor.id).remove();
    $("#medium-editor-anchor-preview-"+mediumEditor.id).remove();
    mediumEditor = null;
  }
};
