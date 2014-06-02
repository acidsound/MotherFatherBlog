/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 6. 2.
 * Time: 오후 3:32
 * To change this template use File | Settings | File Templates.
 */
mediumEditor = null;

initMediumEditor = function(elem, modalOpt) {
  if(mediumEditor == null){
    mediumEditor = new MediumEditor(elem,modalOpt);
  }else{
    destroyMediumEditor();
    initMediumEditor(elem, modalOpt);
  }
}
destroyMediumEditor = function(){
  if(mediumEditor!= null){
    $("#medium-editor-toolbar-"+mediumEditor.id).remove();
    $("#medium-editor-anchor-preview-"+mediumEditor.id).remove();
    mediumEditor = null;
  }
};