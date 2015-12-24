/** Extend Number object with method to convert numeric degrees to radians */
if (Number.prototype.toRadians === undefined) {
  Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
  };
}


/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (Number.prototype.toDegrees === undefined) {
  Number.prototype.toDegrees = function () {
    return this * 180 / Math.PI;
  };
}

var shipWidth = 88, 
    shipHeight = 135,
    shipXML = '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 264 406" style="enable-background:new 0 0 264 406;" width="88px" height="135px" xml:space="preserve"><style type="text/css">	.st0{fill:#5BA7DC;stroke:#000000;stroke-width:3;stroke-miterlimit:10;}	.st1{fill:#5BA7DC;}	.st2{fill:#D51A3C;}	.st3{fill:#B5D5F0;}	.st4{opacity:0.15;fill:#006AB0;}	.st5{fill:#5499C9;}	.st6{fill:#BB1333;}	.st7{fill:#85C7EE;}	.st8{fill:#F57E25;}	.st9{fill:#FFCF01;}	.st10{fill:#0083CA;stroke:#000000;stroke-width:3;stroke-miterlimit:10;}	.st11{fill:none;stroke:#000000;stroke-width:3;stroke-miterlimit:10;}	.st12{fill:#FFFFFF;stroke:#000000;stroke-width:3;stroke-miterlimit:10;}	.st13{fill:#FFFFFF;}	.st14{fill:#EFEFEF;stroke:#000000;stroke-width:3;stroke-miterlimit:10;}</style><path class="st14" d="M130.3,8.7c0,0-93.3,41.3-87.3,148.7c0,0,2,116.7,87.3,140.7c85.3-24,87.3-140.7,87.3-140.7	C223.6,50,130.3,8.7,130.3,8.7z"/><polyline class="st0" points="56.2,222.8 16,252 19.3,298 109.8,289.7 "/><polyline class="st0" points="204.5,222.8 244.7,252 241.4,298 150.9,289.7 "/><path class="st1" d="M215.4,119.9l0.3,2.4c1.2,7.6,2,15.1,2.2,22.7c-0.3-22.8-5.2-42.4-12.6-59c4.7,11,7.9,22.4,10,33.9L215.4,119.9	z"/><path class="st1" d="M133.5,131l-33.1-0.8L64,124.6l7.8,1.4l19.2,3.7l23.2,1.1l17.9,1l14.2-1c0-0.2,0-0.4,0-0.7L133.5,131z"/><path class="st1" d="M48.4,106.3l15,3.5l19.8,4.2l29.2,2.8L147,117c1-43.2-6.4-76.2-11.7-93.9l-10.1,0.1l-16.8-0.8l8.4-6.4	c-21.2,13.4-61,45.4-71.5,102.3l1.4-5.6L48.4,106.3z"/><path class="st1" d="M93.3,271l-8.8-0.8c1.5,1.6,3,3.1,4.6,4.6l-3.3-4.3L93.3,271z"/><path class="st1" d="M61.6,124.2l-16.5-4.7c-1.4,8.1-2.3,16.7-2.4,25.8l2.4-24.1L61.6,124.2z"/><path class="st1" d="M43.6,167l-0.6-8.6C43.1,159.8,43.2,162.8,43.6,167z"/><path class="st1" d="M192.9,247.5c-1.8,3-3.5,5.8-5.3,8.4C189.4,253.2,191.2,250.4,192.9,247.5z"/><path class="st1" d="M101.5,284.7L89.4,275C93.1,278.5,97.2,281.7,101.5,284.7z"/><path class="st1" d="M55.4,220.8l-9.6-36.9C47.6,194.5,50.6,207.4,55.4,220.8z"/><path class="st1" d="M69.4,250.3l-10.3-20C62,237.1,65.4,243.8,69.4,250.3z"/><path class="st1" d="M192.9,247.5c0.6-1,1.1-1.9,1.6-2.9l0,0C194,245.6,193.4,246.6,192.9,247.5z"/><path class="st1" d="M141.6,273.5l-22.4-0.3c0,0.1,0,0.1,0,0.2l0.3,0l0.3,10.3l0.9,10.9l-9.7-4.3c5.9,3.1,12.3,5.7,19.2,7.6	c4-1.1,7.7-2.4,11.3-3.9c-0.9,0.3-1.3,0.4-1.3,0.4S141.7,284.3,141.6,273.5z"/><path class="st2" d="M45.1,119.4L45.1,119.4c0.1-0.3,0.2-0.6,0.2-1L45.1,119.4z"/><path class="st2" d="M64,124.6l36.4,5.5l33.1,0.8l12.9-0.7c0.3-4.5,0.5-9,0.6-13.3l-34.6-0.1L83.3,114l-19.8-4.2l-15-3.5l-1.7,6.5	l-1.4,5.6c-0.1,0.3-0.1,0.7-0.2,1l16.5,4.7L64,124.6z"/><path class="st3" d="M72.6,256.6L84,270.1l0.5,0c-5.8-6.1-10.8-12.8-15.1-19.8L72.6,256.6z"/><path class="st3" d="M195.3,243.2c-0.2,0.4-0.4,0.7-0.6,1.1c-0.1,0.1-0.1,0.2-0.2,0.3l2.5-3.5l2.8-6.8c-1.3,2.7-2.6,5.4-4,8	C195.6,242.6,195.5,242.9,195.3,243.2z"/><path class="st3" d="M207.7,214.8l0.4-1.4c-0.4,1.1-0.7,2.2-1.1,3.3L207.7,214.8z"/><path class="st3" d="M44.4,178.3l1.5,5.6c-1.1-6.7-1.8-12.5-2.2-16.9L44.4,178.3z"/><path class="st3" d="M56.6,225.3l2.6,5c-1.4-3.2-2.6-6.4-3.8-9.6L56.6,225.3z"/><path class="st3" d="M42.7,145.3l-0.4,3.7l0.6,9.3c0-0.6,0-1,0-1C42.8,153.2,42.7,149.2,42.7,145.3z"/><path class="st3" d="M194.5,244.7L194.5,244.7c0.1-0.2,0.2-0.3,0.2-0.4C194.6,244.4,194.6,244.5,194.5,244.7z"/><path class="st3" d="M215.3,120.2L215.3,120.2c0.1,0.7,0.2,1.4,0.3,2.1l-0.3-2.4l-0.1,0c0,0,0,0,0,0L215.3,120.2z"/><path class="st3" d="M101.8,271.6l6.1,0.6c25.6-52.4,35.9-100.7,38.5-141.2l-14.2,1l-17.9-1L91,129.8L71.8,126l-7.8-1.4l-1.9-0.3	l-0.5-0.2l-16.5-3l-2.4,24.1c-0.1,3.9,0,7.9,0.2,12.1c0,0,0,0.4,0,1l0.6,8.6c0.4,4.5,1.1,10.2,2.2,16.9l9.6,36.9	c1.1,3.2,2.4,6.4,3.8,9.6l10.3,20c4.3,7,9.3,13.7,15.1,19.8l8.8,0.8L101.8,271.6z"/><path class="st3" d="M130.3,247.5c-8.7,0.8-10.9,13.6-11.1,25.6l22.4,0.3C141.5,260.6,139.4,246.7,130.3,247.5z"/><path class="st3" d="M195.8,242.3c-0.2,0.3-0.3,0.6-0.5,0.9C195.5,242.9,195.6,242.6,195.8,242.3z"/><path class="st3" d="M215.3,119.9c0,0.1,0,0.2,0,0.3l0,0L215.3,119.9z"/><polygon class="st3" points="62.2,124.3 64,124.6 61.6,124.2 "/><path class="st2" d="M89.2,274.8l0.3,0.2c-0.1-0.1-0.2-0.2-0.4-0.3L89.2,274.8z"/><path class="st2" d="M101.6,284.7l4.1,3.3l5.4,2.4C107.8,288.7,104.6,286.8,101.6,284.7L101.6,284.7z"/><path class="st2" d="M101.5,284.7L101.5,284.7C101.6,284.7,101.6,284.7,101.5,284.7C101.5,284.7,101.5,284.7,101.5,284.7z"/><path class="st2" d="M107.8,272.3L93.3,271l-7.5-0.5l3.3,4.3c0.1,0.1,0.2,0.2,0.4,0.3l12.1,9.6c0,0,0,0,0.1,0	C103.8,280.6,105.8,276.4,107.8,272.3z"/><path class="st2" d="M101.6,284.7c3,2,6.2,3.9,9.5,5.6l9.7,4.3L101.6,284.7z"/><path class="st2" d="M120.7,294.6l-0.9-10.9l-0.3-10.3l-0.3,0C119.1,284.3,120.7,294.6,120.7,294.6z"/><path class="st2" d="M101.8,271.6l-8.5-0.6l14.5,1.4c0,0,0-0.1,0.1-0.1L101.8,271.6z"/><path class="st4" d="M176.5,269.9l-0.2,0c-9.3,9.9-20.7,18.4-34.7,24.1c5.4-1.6,26.4-9.5,45.9-38.1c-3.1,4.6-6.6,9-10.4,13.2	L176.5,269.9z"/><path class="st4" d="M205.1,221.2c-1.4,3.9-3,7.9-4.8,11.8l-0.5,1.2c2.6-5.6,5-11.5,7.1-17.6L205.1,221.2z"/><path class="st4" d="M192.9,247.5C192.9,247.5,192.9,247.5,192.9,247.5C192.9,247.5,192.9,247.5,192.9,247.5	C192.9,247.5,192.9,247.5,192.9,247.5z"/><polygon class="st4" points="101.6,284.7 101.6,284.7 101.6,284.7 "/><path class="st4" d="M205.3,86c0,0,0-0.1-0.1-0.1c-23.6-55.4-74.9-77.2-74.9-77.2S181.1,31.1,205.3,86z"/><path class="st4" d="M217.9,150.2l0.1,1.7l-0.2,1.8c0,1.2-0.1,2.4-0.2,3.6c0,0-0.2,10.3-2.7,25.5l-0.4,4.5l-1.8,7.2	c-0.9,4.2-2,8.5-3.3,13l-1.5,5.9c6.8-20.9,10.7-44.5,9.9-68.5C217.9,146.7,217.9,148.4,217.9,150.2z"/><path class="st1" d="M205.1,221.2l-4.8,11.8C202.1,229.1,203.6,225.1,205.1,221.2z"/><path class="st4" d="M205.1,221.2l-4.8,11.8C202.1,229.1,203.6,225.1,205.1,221.2z"/><path class="st1" d="M177.1,269.1c3.8-4.2,7.3-8.6,10.4-13.2c1.8-2.6,3.6-5.4,5.3-8.4c0,0,0,0,0,0c0.5-0.9,1.1-1.9,1.6-2.8	L177.1,269.1z"/><path class="st4" d="M177.1,269.1c3.8-4.2,7.3-8.6,10.4-13.2c1.8-2.6,3.6-5.4,5.3-8.4c0,0,0,0,0,0c0.5-0.9,1.1-1.9,1.6-2.8	L177.1,269.1z"/><polygon class="st1" points="187.4,126.8 196.2,124.6 175.7,128.1 "/><polygon class="st4" points="187.4,126.8 196.2,124.6 175.7,128.1 "/><path class="st1" d="M151.8,22l-2.5,0.9l-14,0.2C140.6,40.8,148,73.8,147,117l5.8,0l42.4-6.3l16.8-4.3l3.3,13.6l0,0	c-2-11.5-5.3-22.9-10-33.9c-24.3-54.8-75-77.3-75-77.3s0.1,0.2,0.2,0.6L151.8,22z"/><path class="st5" d="M151.8,22l-2.5,0.9l-14,0.2C140.6,40.8,148,73.8,147,117l5.8,0l42.4-6.3l16.8-4.3l3.3,13.6l0,0	c-2-11.5-5.3-22.9-10-33.9c-24.3-54.8-75-77.3-75-77.3s0.1,0.2,0.2,0.6L151.8,22z"/><path class="st1" d="M212.7,194.5l-3.3,13C210.7,203,211.8,198.7,212.7,194.5z"/><path class="st4" d="M212.7,194.5l-3.3,13C210.7,203,211.8,198.7,212.7,194.5z"/><path class="st1" d="M166.4,129.2l-19.9,1.1c0,0.2,0,0.4,0,0.7l11-0.8L166.4,129.2z"/><path class="st4" d="M166.4,129.2l-19.9,1.1c0,0.2,0,0.4,0,0.7l11-0.8L166.4,129.2z"/><path class="st1" d="M217,133.4l0.9,16.8c0-1.8,0-3.5,0-5.2c-0.3-7.6-1-15.2-2.2-22.7L217,133.4z"/><path class="st4" d="M217,133.4l0.9,16.8c0-1.8,0-3.5,0-5.2c-0.3-7.6-1-15.2-2.2-22.7L217,133.4z"/><path class="st1" d="M176.3,270l-30.8,3.6l-3.9-0.1c0.1,10.9-1.3,21-1.3,21s0.5-0.1,1.3-0.4C155.6,288.3,167,279.9,176.3,270z"/><path class="st4" d="M176.3,270l-30.8,3.6l-3.9-0.1c0.1,10.9-1.3,21-1.3,21s0.5-0.1,1.3-0.4C155.6,288.3,167,279.9,176.3,270z"/><path class="st1" d="M119.2,273.3c0-0.1,0-0.1,0-0.2l-2.3,0L119.2,273.3z"/><path class="st4" d="M119.2,273.3c0-0.1,0-0.1,0-0.2l-2.3,0L119.2,273.3z"/><path class="st1" d="M217.6,157.3c0.1-1.2,0.1-2.4,0.2-3.6l-2.8,29.1C217.5,167.7,217.6,157.3,217.6,157.3z"/><path class="st4" d="M217.6,157.3c0.1-1.2,0.1-2.4,0.2-3.6l-2.8,29.1C217.5,167.7,217.6,157.3,217.6,157.3z"/><path class="st2" d="M175.7,128.1l20.5-3.5l19.1-4.7l-3.3-13.6l-16.8,4.3l-42.4,6.3l-5.8,0c-0.1,4.3-0.3,8.8-0.6,13.3l19.9-1.1	L175.7,128.1z"/><path class="st6" d="M175.7,128.1l20.5-3.5l19.1-4.7l-3.3-13.6l-16.8,4.3l-42.4,6.3l-5.8,0c-0.1,4.3-0.3,8.8-0.6,13.3l19.9-1.1	L175.7,128.1z"/><path class="st3" d="M214.5,187.3l0.4-4.5c-0.6,3.6-1.3,7.6-2.2,11.7L214.5,187.3z"/><path class="st4" d="M214.5,187.3l0.4-4.5c-0.6,3.6-1.3,7.6-2.2,11.7L214.5,187.3z"/><path class="st3" d="M195.8,242.3c1.4-2.6,2.7-5.2,4-8l0.5-1.2C198.9,236.1,197.4,239.2,195.8,242.3z"/><path class="st4" d="M195.8,242.3c1.4-2.6,2.7-5.2,4-8l0.5-1.2C198.9,236.1,197.4,239.2,195.8,242.3z"/><path class="st3" d="M176.5,269.9l0.6-0.8c-0.3,0.3-0.5,0.6-0.8,0.8L176.5,269.9z"/><path class="st4" d="M176.5,269.9l0.6-0.8c-0.3,0.3-0.5,0.6-0.8,0.8L176.5,269.9z"/><path class="st3" d="M218,151.9l-0.1-1.7c0,1.2,0,2.3-0.1,3.5L218,151.9z"/><path class="st4" d="M218,151.9l-0.1-1.7c0,1.2,0,2.3-0.1,3.5L218,151.9z"/><path class="st3" d="M195.3,243.2c-0.2,0.4-0.4,0.7-0.6,1.1C194.9,243.9,195.1,243.5,195.3,243.2z"/><path class="st4" d="M195.3,243.2c-0.2,0.4-0.4,0.7-0.6,1.1C194.9,243.9,195.1,243.5,195.3,243.2z"/><path class="st3" d="M205.1,221.2l1.8-4.5c0.4-1.1,0.7-2.2,1.1-3.3l1.5-5.9C208.2,212,206.8,216.6,205.1,221.2z"/><path class="st4" d="M205.1,221.2l1.8-4.5c0.4-1.1,0.7-2.2,1.1-3.3l1.5-5.9C208.2,212,206.8,216.6,205.1,221.2z"/><polygon class="st3" points="215.3,119.9 215.3,119.9 215.3,119.9 "/><polygon class="st4" points="215.3,119.9 215.3,119.9 215.3,119.9 "/><path class="st3" d="M212.7,194.5c0.9-4.1,1.6-8,2.2-11.7l2.8-29.1c0-1.2,0.1-2.4,0.1-3.5l-0.9-16.8l-1.3-11.1	c-0.1-0.7-0.2-1.4-0.4-2.1l-12.7,3.3l-6.4,1.1l-8.8,2.2l-11.7,1.3l-4.8,0.8l-4.6,0.3l-8.9,1l-11,0.8c-2.6,40.5-12.9,88.8-38.5,141.2	l9,0.9l2.3,0c0.1-12.1,2.4-24.8,11.1-25.6c9.1-0.8,11.2,13.1,11.3,26l3.9,0.1l30.8-3.6c0.3-0.3,0.5-0.6,0.8-0.8l17.4-24.5	c0.1-0.1,0.1-0.3,0.2-0.4c0.2-0.4,0.4-0.7,0.6-1.1c0.2-0.3,0.3-0.6,0.5-0.9c1.6-3,3.1-6.1,4.5-9.2l4.8-11.8	c1.7-4.6,3.1-9.2,4.4-13.7L212.7,194.5z"/><path class="st7" d="M212.7,194.5c0.9-4.1,1.6-8,2.2-11.7l2.8-29.1c0-1.2,0.1-2.4,0.1-3.5l-0.9-16.8l-1.3-11.1	c-0.1-0.7-0.2-1.4-0.4-2.1l-12.7,3.3l-6.4,1.1l-8.8,2.2l-11.7,1.3l-4.8,0.8l-4.6,0.3l-8.9,1l-11,0.8c-2.6,40.5-12.9,88.8-38.5,141.2	l9,0.9l2.3,0c0.1-12.1,2.4-24.8,11.1-25.6c9.1-0.8,11.2,13.1,11.3,26l3.9,0.1l30.8-3.6c0.3-0.3,0.5-0.6,0.8-0.8l17.4-24.5	c0.1-0.1,0.1-0.3,0.2-0.4c0.2-0.4,0.4-0.7,0.6-1.1c0.2-0.3,0.3-0.6,0.5-0.9c1.6-3,3.1-6.1,4.5-9.2l4.8-11.8	c1.7-4.6,3.1-9.2,4.4-13.7L212.7,194.5z"/><polygon class="st3" points="170.9,128.9 175.7,128.1 166.4,129.2 "/><polygon class="st4" points="170.9,128.9 175.7,128.1 166.4,129.2 "/><path class="st3" d="M202.6,123.5l12.7-3.3c0-0.1,0-0.2,0-0.3l0,0l-19.1,4.7L202.6,123.5z"/><path class="st4" d="M202.6,123.5l12.7-3.3c0-0.1,0-0.2,0-0.3l0,0l-19.1,4.7L202.6,123.5z"/><path class="st2" d="M101.6,284.7C101.6,284.7,101.6,284.7,101.6,284.7L101.6,284.7L101.6,284.7	C101.6,284.7,101.6,284.7,101.6,284.7z"/><path class="st4" d="M101.6,284.7C101.6,284.7,101.6,284.7,101.6,284.7L101.6,284.7L101.6,284.7	C101.6,284.7,101.6,284.7,101.6,284.7z"/><path class="st2" d="M115.7,273.1l-7.9-0.7c-2,4.1-4.1,8.2-6.3,12.4c0,0,0,0,0,0l19.1,9.9c0,0-1.6-10.3-1.5-21.3l-2.3-0.2	L115.7,273.1z"/><path class="st6" d="M115.7,273.1l-7.9-0.7c-2,4.1-4.1,8.2-6.3,12.4c0,0,0,0,0,0l19.1,9.9c0,0-1.6-10.3-1.5-21.3l-2.3-0.2	L115.7,273.1z"/><path class="st2" d="M116.9,273.1l-9-0.9c0,0,0,0.1-0.1,0.1l7.9,0.7L116.9,273.1z"/><path class="st4" d="M116.9,273.1l-9-0.9c0,0,0,0.1-0.1,0.1l7.9,0.7L116.9,273.1z"/><path class="st8" d="M158.7,343.5c0,16.3-21.7,54.6-29.5,54.6c-8.4,0-29.5-38.3-29.5-54.6s13.2-35.8,29.5-35.8	S158.7,327.2,158.7,343.5z"/><path class="st9" d="M148.9,340.3c0,10.8-14.5,36.4-19.6,36.4c-5.6,0-19.6-25.6-19.6-36.4s8.8-23.8,19.6-23.8	S148.9,329.5,148.9,340.3z"/><path class="st10" d="M28.1,259.9c0,23.6-4.7,57.5-10.4,57.5s-10.4-34-10.4-57.5c0-23.6,4.7-27.8,10.4-27.8S28.1,236.4,28.1,259.9z"	/><path class="st10" d="M234.6,259.9c0,23.6,4.7,57.5,10.4,57.5c5.8,0,10.4-34,10.4-57.5c0-23.6-4.7-27.8-10.4-27.8	C239.3,232.2,234.6,236.4,234.6,259.9z"/><polygon class="st6" points="174.9,270.1 157.8,272.1 141,273.7 141.3,281.3 140.3,294.4 155,287.6 169.3,277.1 "/><path class="st11" d="M176.5,269.8c-15.1,2.2-30.5,3.3-46.1,3.3c-15.7,0-31.1-1.1-46.1-3.3"/><path class="st11" d="M130.3,8.7c0,0-93.3,41.3-87.3,148.7c0,0,2,116.7,87.3,140.7c85.3-24,87.3-140.7,87.3-140.7	C223.6,50,130.3,8.7,130.3,8.7z"/><path class="st10" d="M141,274.1c0,22.5-5.2,55-10.7,55c-5.5,0-10.7-32.5-10.7-55s5.2-26.6,10.7-26.6	C135.8,247.5,141,251.5,141,274.1z"/><path class="st11" d="M215.7,120.2c-27.2,7.3-55.8,11.1-85.3,11.1c-29.5,0-58.1-3.9-85.4-11.1"/><path class="st11" d="M212.6,106.4c-26.2,7.1-53.8,10.8-82.2,10.8c-28.4,0-56-3.8-82.2-10.8"/><circle class="st12" cx="130.3" cy="166.7" r="26.3"/><circle cx="130.3" cy="166.7" r="20.5"/><circle class="st13" cx="120.3" cy="157.5" r="3"/></svg>',
  asteroidXML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="#efefef" stroke="#333" stroke-width="3" d="M91.3,52.6c0-2,0.9-4.4,1.8-6.8c1.3-3.7,2.7-7.5,1.4-10.7c-2.3-5.5-7.6-11.2-10.5-14.2c-0.9-0.9-1.9-2.1-3-3.3   c-3.1-3.5-6.6-7.5-10.5-9c-3.1-1.3-7.2-1.4-10.5-1.4c-1.4,0-2.9,0-4.3,0.1c-1.2,0-2.4,0.1-3.5,0.1c-3.8,0-6.2,3.8-8.6,7.4   c-1.6,2.4-3.2,4.9-4.8,5.5c-0.6,0.3-1.5,0.4-2.5,0.4c-1.4,0-3.1-0.3-4.7-0.5c-1.7-0.3-3.5-0.5-5.1-0.5c-2.4,0-4.2,0.6-5.4,1.9   c-3.9,3.9-6.6,9.9-8.6,14.7c-0.6,1.5-1.6,3.2-2.7,5C7.5,44.7,5,48.7,5,52.6c0,3.8,3.7,6.5,7.3,9.1c2.3,1.7,4.8,3.5,5.4,5.1   c2,4.8,3.8,8.7,7.6,12.5c1.2,1.2,2.2,2.7,3.3,4.3c2,2.9,4.1,5.9,7.5,7.4c3.9,1.6,8.3,1.8,12.4,1.8c0.6,0,1.2,0,1.8,0   c0.6,0,1.2,0,1.8,0c4.1,0,7.5-1.7,10.7-3.4c1.2-0.6,2.5-1.3,3.8-1.8c1.5-0.6,3-1.1,4.5-1.5c3.4-1,7-2.1,9.7-4.8   c1.2-1.2,2.8-2.3,4.6-3.5c3.3-2.2,6.6-4.6,8.1-8c1.3-3.2,0.2-7-0.9-10.6C92,56.9,91.3,54.6,91.3,52.6z"/><path stroke="#333" stroke-width="3" fill="#ccc" d="M68.1,29.3c-6,0-10.8,4.9-10.8,10.8S62.1,51,68.1,51s10.8-4.9,10.8-10.8S74.1,29.3,68.1,29.3z "/><path stroke="#333" stroke-width="3" fill="#ccc" d="M38.4,32.7c-3.1,0-5.6,2.4-5.6,5.4c0,3,2.5,5.4,5.6,5.4c3.1,0,5.6-2.4,5.6-5.4C44.1,35.1,41.5,32.7,38.4,32.7z M"/><path stroke="#333" stroke-width="3" fill="#eee" d="M23.5,40.5c-4,0-7.2,4-7.2,9s3.2,9,7.2,9s7.2-4,7.2-9S27.5,40.5,23.5,40.5z"/><path stroke="#333" stroke-width="3" fill="#ddd" d="M54.1,69.5c-4,0-7.3,2.8-7.3,6.2c0,3.4,3.3,6.2,7.3,6.2s7.3-2.8,7.3-6.2C61.4,72.2,58.1,69.5,54.1,69.5z "/></g></svg>',
  shipImg = svgToImage(shipXML),
  asteroidImg = svgToImage(asteroidXML);

function svgToImage(xml) {
  var url = 'data:image/svg+xml;base64,' + btoa(xml);
  var img = new Image();
  img.src = url;
  return img;
}


function RectangularUniverse(canvasSelector, options) {

  //  var defaults = {
  //  speedOfLight: 10,
  //  thrust: 1,
  //  canvasWidth: innerWidth,
  //  canvasHeight: innerHeight,
  //  width: innerWidth / 4,
  //  height: innerHeight / 4,
  //  maxWidth: 2 * innerWidth,
  //  maxHeight: 2 * innerHeight,
  //  startingCount: 10,
  //  endCount: 300,
  //  expansionFactor: 1.01,
  //  additionDelay: 50,
  //  expansionWait: 5000,
  //  expansionDelay: 0,
  //  cooldownFactor: 0.9,
  //  collisionForce: 0.1,
  //  useForceLayout: false,
  //  useCollisions: true,
  //  outlineParticles: true,
  //  shipCentered: true
  //};
  //  
  //  options = _.default(options, defaults);

  var ship, nodes, canvas = d3.select(canvasSelector)
    .attr("width", options.canvasWidth)
    .attr("height", options.canvasHeight);

  var initialWidth = options.width,
    initialHeight = options.height,
    initialAsteroids = _.cloneDeep(options.asteroids);

  this.timeouts = [];
  this.init = function () {
    this.timeouts.forEach(clearTimeout);
    setTimeout(getOffsets);
    options.width = initialWidth;
    options.height = initialHeight;
    options.asteroids = _.cloneDeep(initialAsteroids);
    ship = {
      x: options.width / 2,
      y: options.height / 2,
      vx: 0,
      vy: 0,
      direction: 0,
      totalSpeed: 0,
      totalDistanceTraveled: 0
    };

    nodes = d3.range(options.startingCount)
      .map(createNode);

    this.initCallback && this.initCallback();
    options.paused = false;
  }
  options.paused = true;

  function createNode() {
    return {
      collisions: options.initialCollisions || 0,
      radius: Math.random() * 5 + 15,
      x: Math.random() * options.width,
      y: Math.random() * options.height,
      vx: 2 * Math.random() - 1,
      vy: 2 * Math.random() - 1
    };
  }
  var opacity = 1;
  var temperature = d3.scale
    .linear()
    .domain([0, 100, 150, 200])
    .range(['black', 'red', 'orange', 'white']);

  function wrapAround(node) {
    var didWrap = false;

    if (node.x < 0) {
      didWrap = true;
      node.x = options.width + node.x;
    } else if (node.x > options.width) {
      didWrap = true;
      node.x -= options.width;
    }
    node.px = node.x;

    if (node.y < 0) {
      didWrap = true;
      node.y = options.height + node.y;
    } else if (node.y > options.height) {
      didWrap = true;
      node.y -= options.height;
    }
    node.py = node.y;

    return didWrap;
  }

  this.addOne = function () {
    if (!inView || options.paused)
      return this.timeouts.push(setTimeout(this.addOne, options.additionDelay));

    if (nodes.length < options.endCount) {
      nodes.push(createNode());
      this.timeouts.push(setTimeout(this.addOne, options.additionDelay));
    } else {
      this.filledCallback && this.timeouts.push(setTimeout(this.filledCallback));
    }
  }.bind(this);

  this.expand = function () {
    if (!inView || options.paused)
      return this.timeouts.push(setTimeout(this.expand, options.expansionDelay));

    if (options.width < options.maxWidth && options.height < options.maxHeight) {
      options.width *= options.expansionFactor;
      options.height *= options.expansionFactor;

      nodes.forEach(function (node) {
        node.x *= options.expansionFactor;
        node.y *= options.expansionFactor;
      });

      ship.x *= options.expansionFactor;
      ship.y *= options.expansionFactor;

      options.asteroids.forEach(function (asteroid) {
        asteroid.x *= options.expansionFactor;
        asteroid.y *= options.expansionFactor;
      });

      this.timeouts.push(setTimeout(this.expand, options.expansionDelay));
    } else {
      this.expansionCallback && this.timeouts.push(setTimeout(this.expansionCallback));
    }
  }.bind(this);



  var isMousedown = false,
    isTouching = false,
    mousePosition = {
      x: 0,
      y: 0
    };
  $(canvasSelector).on('mousedown', function (e) {
    // if(!isTouching){
    isMousedown = true;
    mousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
    $(this)
      .on('mousemove', function (e) {
        mousePosition = {
          x: e.offsetX,
          y: e.offsetY
        };

      })
      .on('mouseup', function (e) {
        $(this).off('mousemove mouseup');
        isMousedown = false;
      });
    // }
  });


  $(canvasSelector).on('touchstart', function (e) {
    isMousedown = true;
    isTouching = true;
    e.preventDefault();
    console.log($(canvasSelector)[0].pageY, e.originalEvent.changedTouches[0].pageY, e.originalEvent.changedTouches[0].pageY - $(canvasSelector)[0].pageY);

    var totalOffsetY = 0;
    var curElement = $(canvasSelector)[0];
    do {
      totalOffsetY += curElement.offsetTop;
    } while (curElement = curElement.offsetParent)

    mousePosition = {
      x: e.originalEvent.changedTouches[0].pageX - canvasLeft,
      y: e.originalEvent.changedTouches[0].pageY - totalOffsetY
    };
    $(this)
      .on('touchmove', function (e) {
        var totalOffsetY = 0;
        var curElement = $(canvasSelector)[0];
        do {
          totalOffsetY += curElement.offsetTop;
        } while (curElement = curElement.offsetParent)

        mousePosition = {
          x: e.originalEvent.changedTouches[0].pageX - canvasLeft,
          y: e.originalEvent.changedTouches[0].pageY - totalOffsetY
        };

      })
      .on('touchend touchcancel', function (e) {
        $(this).off('touchmove touchend touchcancel');
        isMousedown = false;

        setTimeout(function () { isTouching = false; }, 100);
      });

  });

  function moveTowards(x, y) {
    // console.log(x, y);
    var dx, dy;
    if (options.shipCentered) {
      dx = x - options.canvasWidth / 2;
      dy = y - options.canvasHeight / 2;
    } else {
      dx = x - (ship.x + Math.max(0, (options.canvasWidth - options.width) / 2));
      dy = y - (ship.y + Math.max(0, (options.canvasHeight - options.height) / 2));
    }

    dx /= options.canvasWidth;
    dy /= options.canvasHeight;

    var vx = ship.totalSpeed * Math.cos(ship.direction),
      vy = ship.totalSpeed * Math.sin(ship.direction),
      newVx = vx + dx,
      newVy = vy + dy;

    ship.totalSpeed = Math.sqrt(newVx * newVx + newVy * newVy);
    ship.direction = Math.atan2(newVy, newVx);
  }

  $(document).on('keydown', function (e) {
    if (!inView || options.paused)
      return;

    if (e.keyCode === 83) {
      ship.totalSpeed -= options.thrust;
    }
    if (e.keyCode === 87) {
      ship.totalSpeed += options.thrust;
    }
    if (e.keyCode === 65) {
      ship.direction -= 3 * options.thrust * Math.PI / 180;
    }
    if (e.keyCode === 68) {
      ship.direction += 3 * options.thrust * Math.PI / 180;
    }
  });

  this.pause = function () {
    options.paused = true;
  }

  this.unpause = function () {
    options.paused = false;
  }

  var canvasTop, canvasBottom, canvasLeft, inView = false;
  setTimeout(getOffsets);
  function getOffsets() {
    var windowTop = $(window).scrollTop(),
      windowBottom = windowTop + $(window).height();

    var curElement = $(canvasSelector)[0];
    canvasLeft = canvasTop = 0;
    do {
      canvasLeft += curElement.offsetLeft;
      canvasTop += curElement.offsetTop;
    } while (curElement = curElement.offsetParent)
    canvasBottom = canvasTop + options.canvasHeight;
    
    inView = canvasTop < windowBottom && canvasBottom > windowTop;
    $(window).scroll(function (event) {
      var windowTop = $(window).scrollTop(),
        windowBottom = windowTop + window.innerHeight;


      inView = canvasTop < windowBottom && canvasBottom > windowTop;
    });
  };

  var context = canvas.node().getContext("2d");
  d3.timer(tick.bind(this));

  function tick(e) {
    if (!inView || options.paused)
      return;

    nodes.forEach(function (node) {
      node.collisions = Math.min(node.collisions, 400);
      node.collisions *= options.cooldownFactor;
    });

    var q = d3.geom.quadtree(nodes),
      i,
      d,
      n = nodes.length;

    if (options.useCollisions)
      for (i = 0; i < n; ++i) q.visit(collide(nodes[i]));

    nodes.forEach(function (node) {
      if (node.vx > options.speedOfLight * 60) node.vx = options.speedOfLight * 60;
      if (node.vx < -options.speedOfLight * 60) node.vx = -options.speedOfLight * 60;
      if (node.vy > options.speedOfLight * 60) node.vy = options.speedOfLight * 60;
      if (node.vy < -options.speedOfLight * 60) node.vy = -options.speedOfLight * 60;
      node.x += node.vx / 60;
      node.y += node.vy / 60;
    });

    nodes.forEach(wrapAround);

    if (isMousedown) {
      moveTowards(mousePosition.x, mousePosition.y);
    }

    ship.direction = (((ship.direction.toDegrees() + 540) % 360) - 180).toRadians()
    //    ship.direction = Math.atan2(ship.vy, ship.vx);
    //    ship.totalSpeed = Math.sqrt(Math.pow(ship.vx, 2) + Math.pow(ship.vy, 2));
    if (ship.totalSpeed > options.speedOfLight) {
      ship.totalSpeed = options.speedOfLight;
    } else if (ship.totalSpeed < 0) {
      ship.totalSpeed = 0;
    }
    ship.vx = Math.cos(ship.direction) * ship.totalSpeed;
    ship.vy = Math.sin(ship.direction) * ship.totalSpeed;

    ship.x += ship.vx;
    ship.y += ship.vy;
    ship.totalDistanceTraveled += ship.totalSpeed;

    if (this.triggerDistance && ship.totalDistanceTraveled > this.triggerDistance) {
      this.distanceCallback && this.timeouts.push(setTimeout(this.distanceCallback));
    }

    var didWrap = wrapAround(ship);
    if (didWrap) {
      this.wrapCallback && this.timeouts.push(setTimeout(this.wrapCallback))
    }

    render();

  }
  //d3.timer(render);

  function render() {

    context.save();
    context.translate((options.canvasWidth - options.width) / 2, (options.canvasHeight - options.height) / 2);

    var renderNodes = [];

    nodes.forEach(wrapAround);
    nodes.forEach(function (node) {
      renderNodes.push(node);
      var nodeX = options.shipCentered ? (options.width / 2 + (node.x - ship.x)) : node.x;
      var nodeY = options.shipCentered ? (options.height / 2 + (node.y - ship.y)) : node.y;
      if (nodeX - 2 * node.radius < 0)
        renderNodes.push({
          x: options.width + node.x,
          y: node.y,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeX + 2 * node.radius > options.width)
        renderNodes.push({
          x: node.x - options.width,
          y: node.y,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeY - 2 * node.radius < 0)
        renderNodes.push({
          x: node.x,
          y: options.height + node.y,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeY + 2 * node.radius > options.height)
        renderNodes.push({
          x: node.x,
          y: node.y - options.height,
          collisions: node.collisions,
          radius: node.radius
        });

      //Corners
      if (nodeX - 2 * node.radius < 0 && nodeY - 2 * node.radius < 0)
        renderNodes.push({
          x: options.width + node.x,
          y: options.height + node.y,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeX - 2 * node.radius < 0 && nodeY + 2 * node.radius > options.height)
        renderNodes.push({
          x: options.width + node.x,
          y: node.y - options.height,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeX + 2 * node.radius > options.width && nodeY - 2 * node.radius < 0)
        renderNodes.push({
          x: node.x - options.width,
          y: node.y + options.height,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeX + 2 * node.radius > options.width && nodeY + 2 * node.radius > options.height)
        renderNodes.push({
          x: node.x - options.width,
          y: node.y - options.height,
          collisions: node.collisions,
          radius: node.radius
        });
    });

    //  nodes.forEach(wrapAround);
    context.fillStyle = 'black';
    context.fillRect(0, 0, options.width, options.height);
    n = renderNodes.length;
    //    console.log(n);
    for (i = n - 1; i >= 0; --i) {
      d = renderNodes[i];
      var nodeX = options.shipCentered ? (options.width / 2 + (d.x - ship.x)) : d.x;
      var nodeY = options.shipCentered ? (options.height / 2 + (d.y - ship.y)) : d.y;
      context.beginPath();
      context.strokeStyle = "white";
      context.fillStyle = temperature(d.collisions);
      context.moveTo(nodeX, nodeY);
      context.arc(nodeX, nodeY, d.radius, 0, 2 * Math.PI);
      options.outlineParticles && context.stroke();
      context.fill();
    }

    function renderShip(x, y, angle) {
      context.save();
      context.translate(x, y);
      context.rotate(angle + Math.PI / 2);
      context.translate(-x - 50, -y - 50);
      context.beginPath();
      context.fillStyle = "white";
      context.drawImage(shipImg, x, y);
      context.fill();
      context.restore();
    }

    options.asteroids.forEach(function (asteroid) {

      wrapAround(asteroid);

      var asteroidX = options.shipCentered ? (options.width / 2 + (asteroid.x - ship.x)) : asteroid.x;
      var asteroidY = options.shipCentered ? (options.height / 2 + (asteroid.y - ship.y)) : asteroid.y;

      function renderAsteroid(x, y, angle) {
        context.save();
        context.translate(x, y);
        context.rotate(angle + Math.PI / 2);
        context.translate(-x - 50, -y - 50);
        context.beginPath();
        context.fillStyle = "white";
        context.drawImage(asteroidImg, x, y);
        context.fill();
        context.restore();
      }
      renderAsteroid(asteroidX, asteroidY, 0);

      if (asteroidX - 100 < 0) {
        renderAsteroid(options.width + asteroidX, asteroidY, 0);
      }

      if (asteroidX + 100 > options.width) {
        renderAsteroid(asteroidX - options.width, asteroidY, 0);
      }

      if (asteroidY - 125 < 0) {
        renderAsteroid(asteroidX, options.height + asteroidY, 0);
      }

      if (asteroidY + 125 > options.height) {
        renderAsteroid(asteroidX, asteroidY - options.height, 0);
      }

      // Corners
      if (asteroidX - 100 < 0 && asteroidY - 125 < 0) {
        renderAsteroid(options.width + asteroidX, options.height + asteroidY, 0);
      }

      if (asteroidX - 100 < 0 && asteroidY + 125 > options.height) {
        renderAsteroid(options.width + asteroidX, asteroidY - options.height, 0);
      }

      if (asteroidX + 100 > options.width && asteroidY - 125 < 0) {
        renderAsteroid(asteroidX - options.width, options.height + asteroidY, 0);
      }

      if (asteroidX + 100 > options.width && asteroidY + 125 > options.height) {
        renderAsteroid(asteroidX - options.width, asteroidY - options.height, 0);
      }

    });

    if (options.shipCentered) {
      renderShip(options.width / 2, options.height / 2, ship.direction);
    } else {
      renderShip(ship.x, ship.y, ship.direction);

      if (ship.x - 100 < 0) {
        renderShip(options.width + ship.x, ship.y, ship.direction);
      }

      if (ship.x + 100 > options.width) {
        renderShip(ship.x - options.width, ship.y, ship.direction);
      }

      if (ship.y - 100 < 0) {
        renderShip(ship.x, options.height + ship.y, ship.direction);
      }

      if (ship.y + 100 > options.height) {
        renderShip(ship.x, ship.y - options.height, ship.direction);
      }

      // Corners
      if (ship.x - 100 < 0 && ship.y - 125 < 0) {
        renderShip(options.width + ship.x, options.height + ship.y, 0);
      }

      if (ship.x - 100 < 0 && ship.y + 125 > options.height) {
        renderShip(options.width + ship.x, ship.y - options.height, 0);
      }

      if (ship.x + 100 > options.width && ship.y - 125 < 0) {
        renderShip(ship.x - options.width, options.height + ship.y, 0);
      }

      if (ship.x + 100 > options.width && ship.y + 125 > options.height) {
        renderShip(ship.x - options.width, ship.y - options.height, 0);
      }
    }

    context.restore();
    //  context.translate((innerWidth-options.width)/2,(innerHeight - options.height)/2);
    context.clearRect(0, 0, (options.canvasWidth - options.width) / 2, options.canvasHeight);
    context.clearRect((options.canvasWidth + options.width) / 2, 0, options.canvasWidth, options.canvasHeight);
    context.clearRect(0, 0, options.canvasWidth, (options.canvasHeight - options.height) / 2);
    context.clearRect(0, (options.canvasHeight + options.height) / 2, options.canvasWidth, options.canvasHeight);

    context.strokeStyle = "white";
    context.strokeRect(
      (options.canvasWidth - options.width) / 2, (options.canvasHeight - options.height) / 2,
      options.width, options.height);
  }

  function collide(node) {
    var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
    return function (quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
          y = node.y - quad.point.y;

        if (Math.abs(x) > options.width / 2) x = x > 0 ? x - options.width : x + options.width;
        if (Math.abs(y) > options.height / 2) y = y > 0 ? y - options.height : y + options.height;

        var l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
        if (l < r) {
          l = (l - r) / l * options.collisionForce;
          x = (x * l);
          y = (y * l);
          node.vx -= x;
          node.vy -= y;
          node.collisions++;
          quad.point.vx += x;
          quad.point.vy += y;
          quad.point.collisions++;
        }
      }
      return (x1 > nx2 && x2 < options.width && nx1 > 0) || (x2 < nx1 && nx2 < options.width && x1 > 0) || (y1 > ny2 && y2 < options.height && ny1 > 0) || (y2 < ny1 && ny2 < options.height && y1 > 0);
    };
  }

  return this;
};