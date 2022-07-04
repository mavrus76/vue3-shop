export default function gotoPage(pageName, pageParams) {
  this.eventBus.emit('gotoPage', pageName, pageParams);
}
