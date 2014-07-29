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
  var options = {
    anchorInputPlaceholder: 'URL을 입력하세요.',
    placeholder:"내용을 입력하세요.",
    targetBlank: true,
    firstHeader:'h1',secondHeader: 'h2'
  };
  if(type =="post"){
    options.buttons = ['quote', 'header2', 'pre' , 'orderedlist','unorderedlist', 'bold', 'italic', 'strikethrough', 'anchor'];
  }else if(type == "comment"){
    options.buttons = ['pre', 'orderedlist', 'unorderedlist', 'bold', 'italic', 'anchor'];
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
