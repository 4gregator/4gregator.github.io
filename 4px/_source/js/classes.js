class Changer {
  constructor(e, t) {
    this.element = '.' + e;
    this.target = '.' + t;
    this.elemName = e + '_active';
    this.targName = t + '_active';
    this.elemClass = '.' + this.elemName;
    this.targClass = '.' + this.targName;
  }
  change(et) {
    let dataAtr = $(et).data();
    let dataKey = Object.keys(dataAtr)[0];
    let dataVal = Object.values(dataAtr)[0];
    let dataStr = this.target + '[data-' + dataKey + '="' + dataVal + '"]';

    $(this.elemClass).removeClass(this.elemName);
    $(this.targClass).removeClass(this.targName);
    $(et).addClass(this.elemName);
    $(dataStr).addClass(this.targName);
  }
}