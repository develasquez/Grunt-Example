(function(){
	Storage.prototype.setItem = function(a,b){
	   var data = b;  
		if(typeof(b) == "object"){
	    	data = JSON.stringify(b);
	  	} 
	  	this[a] = data;
	};
	Storage.prototype.getItem = function(a){
	 	var obj; 
	  	try {
	    	obj = JSON.parse(this[a]) 
	  	}catch(ex){ 
	    	obj = this[a]
	  	}; 
	  	return obj;
	};
    var important = "!important;";
    var style = "position:absolute" + important + "visibility:hidden" + important + "width:1em" + important + "font-size:1em" + important + "padding:0" + important;
    window.getEmPixels = function () {
        var extraBody;
       	element = extraBody = document.createElement("body");
        extraBody.style.cssText = "font-size:1em" + important;
        document.documentElement.insertBefore(extraBody, document.body);
      	var testElement = document.createElement("i");
        testElement.style.cssText = style;
        element.appendChild(testElement);
		var value = testElement.clientWidth;
        if (extraBody) {
            document.documentElement.removeChild(extraBody);
        }
        else {
            element.removeChild(testElement);
        }
        return value;
    };
    Array.prototype.where = function (query) {
	   if (this === void 0 || this === null) {
	      throw new TypeError();
	    }

	    var t = Object(this);
	    var len = t.length >>> 0;
	    if (typeof query !== 'object') {
	      throw new TypeError();
	    }
	    var returnArray = new Array();
	    for (attr in query) {
	      returnArray[returnArray.length] = this.filter(function(e,i,a){
	        var obj = e[attr] == this.toString();
	        return obj
	      },query[attr]);
	    }
	    return returnArray[0];
	};
	var orientation = window.matchMedia("(orientation: portrait)");
	orientation.onChange = function (fun) {
		orientation.addListener(fun);
	};
	var activePage = ".page";
	var _window={};
	var __displayedMenu= false;
	var em = getEmPixels() || 16;
	var _availHeight= window.innerHeight - (em * 3) -15;
	var _headerHeight = 0 ;
	var _footerHeight = 0 ;
	var pointerdownTop = 0;
	var pointerdownLeft = 0;
	var SWIPELONG = 30;
	var _window ={
		width : window.innerWidth,
	    height : window.innerHeight
	};
	var _content ={
	    width : window.innerWidth,
	    height :_availHeight
	};
	_footer ={};
	_header = {};

monomer = {
	    pageShow:function (page) {
        	$(".page").hide();
        	$(page).show();

        	document.location.href = page;
        	activePage = page;
        	$(page).animate({"margin-left":0});
    	},
    	pageClose:function (page) {
        	$(page).animate({"margin-left": 0},function () {
            	setTimeout(function () {
                	$(page).hide();
            	},200)
        	});
    	},
		toast:function(e){
			$("#toastArea").append($("<div>")
								.addClass("toast")
								.html(e)
								.fadeIn()
								.on("click",function(){
									$(this).fadeOut(function(){
										$(this).remove();
									})
								})
								);
			setTimeout(function(){
				$($(".toast")[0])
					.fadeOut(function(){
						$($(".toast")[0]).remove();
					})
				},3e3);
		},
		icon:{
			to:function(el,icon1,icon2){
				$(el).removeClass("icon-transform-b");
				$(el).addClass("icon-transform-a");
				setTimeout(function(){
					$(el).removeClass(icon1);
					$(el).addClass(icon2);
					$(el).removeClass("icon-transform-a");
					$(el).addClass("icon-transform-b");
				},230);
			}
		},
		__touch:{
			addTouch:function  (event) {

				_touch = $("._touch")
				event = event.originalEvent || event;
				_touch.css({top:event.changedTouches[0].clientY ,left:event.changedTouches[0].clientX});
				$("._touch").css({display:"block"});
				
			},
			removeTouch:function  (event) {
				
				event = event.originalEvent || event;
				_touch = $("._touch");
				_touch.css({top:event.changedTouches[0].clientY - 32  ,left:event.changedTouches[0].clientX -32, display:"block"});
				$("._touch").addClass("_touch_expand");
				setTimeout(function () {
					$("._touch").css({display:"none"});
					$("._touch").removeClass("_touch_expand");
				},300);
			}	
		},
		
		__enableBodyTouch: function (){
			setTimeout(function () {
					$("._touch").removeClass("_touch_expand");
					
				__displayedMenu = false;
			},500);
		},
		__getAvalilableWidth : function(element){ 
			var availableWidth = 0;
			var parent = $(element).parent();
			$(parent).children().not(element).each(function(i,e){
			    availableWidth+= $(e).width();
			})
			return $(parent).width() - availableWidth;
		},
		__getAvalilableHeight : function(element){ 
			var availableHeight = 0;
			var parent = $(element).parent();
			$(parent).children().not(element).each(function(i,e){
			    availableHeight+= $(e).height();
			})
			return $(parent).height() - availableHeight;
		},
		__expandSearch: function () {
			$(".expand-search")
				.prev()
				.toggleClass("search-expanded");
		},
		__expandLeftMenu:function () {
			if($(".expand-LeftMenu").hasClass("icon-bars")){
				monomer.icon.to(".expand-LeftMenu","icon-bars","icon-arrow-left")	
			}
			__displayedMenu= false;
			$(".leftMenu").show();
			setTimeout(function () {
				$(".leftMenu").toggleClass("leftMenu-expanded");
				if($(".leftMenu").hasClass("leftMenu-expanded")==false){
					monomer.__hideLeftMenu();
				}else{
                                    monomer.__enableBodyTouch();
                                }
			},1);
			
		},
		__expandRightMenu:function () {
			__displayedMenu= false;
			$(".rightMenu").show()
			setTimeout(function () {
				$(".rightMenu").toggleClass("rightMenu-expanded");
					if($(".rightMenu").hasClass("rightMenu-expanded")==false){
					monomer.__hideRightMenu();
				}else{
                                    monomer.__enableBodyTouch();
                                }
			},1);
		},
		__expandFooter:function () {
			__displayedMenu= false;
			setTimeout(function () {
				if ($(".footer").hasClass("footer-expanded")){
					monomer.__hideFooter();
				}else{
					$(".footer").addClass("footer-expanded");
					$(".footer-expanded").css({"margin-top": -(_content.height - 2), "max-height": _content.height + em * 2  })
					$(".floating-down-left ,.floating-down-right, .floating-up-right, .floating-up-left ").hide();
				}
			},1);
			
			monomer.__enableBodyTouch();
		},
		__expandConfig:function (element,event) {
			__displayedMenu= false;
			element.css({"top":event.clientY - 10, "left":event.clientX -250});
			element.toggleClass("configMenu-expanded");
			monomer.__enableBodyTouch();	
		},
		__hideLeftMenu: function() {
			if($(".expand-LeftMenu").hasClass("icon-arrow-left")){
				monomer.icon.to(".expand-LeftMenu","icon-arrow-left","icon-bars");
			}

			$(".leftMenu").removeClass("leftMenu-expanded");
			setTimeout(function () {
				$(".leftMenu").hide();
			},300);
		},
		__hideRightMenu: function() {
			$(".rightMenu").removeClass("rightMenu-expanded");
			setTimeout(function () {
				$(".rightMenu").hide();
			},300);
		},
		__hideFooter: function() {
			$(".footer").removeClass("footer-expanded");
			$(".footer").css({"margin-top": 0, "max-height": (em * 2) })
			$(".floating-down-left ,.floating-down-right, .floating-up-right, .floating-up-left ").show();
		},
		__showOverlay:function(element){
			$("body").addClass("blur");
			monomer.theOverlay = $(element).addClass("overlay")
			$("html").append(monomer.theOverlay);
		},
		__hideOverlay:function(){
			$("body").removeClass("blur");
			$(monomer.theOverlay).remove();
		},
		__centerOverlay:function(_window,_content){
			var halfH = _window.height / 2
			var heihtOverlay = $(".overlay").height() / 2;
			$(".overlay").css({"top":parseInt(halfH - heihtOverlay)})
		},
		setInterval:function (){},
		dialog:function (options) {
			
		},
		showLoading:function () {
			$(".loading").show();	
		},
		hideLoading:function () {
			$(".loading").hide();
		},
		showDialog:function  (el) {
			
			$(el).addClass("in");
			$(".modal-backdrop").addClass("in");
		},
		hideDialog:function  (el) {
			if (!el){
				el = ".modal-dialog";
			}
			$(el).removeClass("in");
			$(".modal-backdrop").removeClass("in");
			/*setTimeout(function () {
				$(el).hide();
			},500);*/
		},
		__setInputLabelAspect : function (el) {
			var content = "";
				if ($(el).is("select")){
					content =$(el).find("option").not(function(){ return !this.selected }).text() || "" ;
				}else{
				    content = $(el).val().toString() || "";
				}
				
				if(content.length > 0 ){
					if($(el).next().is("i")){
						$(el).next().next().addClass("active");		
					}else if($(el).next().is("label")){
						$(el).next().addClass("active");	
					}
					
				}else{
					$(el).next().removeClass("active");
				}
		},
		__setAspect : function(){
			//$(activePage).css({"margin-left": -window.innerWidth});
			_headerHeight = 0 ;
			_footerHeight = 0 ;
			var aspect_16_9 = $(".aspect_16_9");
			var aspect_3_2  = $(".aspect_3_2");
			var aspect_4_3  = $(".aspect_4_3");
			var aspect_1_1  = $(".aspect_1_1");
			var aspect_Full  = $(".aspect_Full");

			$.each(aspect_16_9,function(index,element){	
				$(element).height($(element).width() * 9 / 16);
			});
			$.each(aspect_3_2,function(index,element){	
				$(element).height($(element).width() * 2 / 3);
			});
			$.each(aspect_4_3,function(index,element){	
				$(element).height($(element).width() * 3 / 4);
			});
			$.each(aspect_1_1,function(index,element){	
				$(element).height($(element).width());
			});
			$.each(aspect_Full,function(index,element){	
				$(element).width($(element).parent().width());
				$(element).height(monomer.__getAvalilableHeight(element));
			});
			_window={
	        	width :window.innerWidth,
	            height :window.innerHeight
	        }
	        $(".loading").css({"top":(window.innerHeight / 2)- em,"left":(window.innerWidth / 2) - em});

	        var selectorActivePage = $(activePage).length > 0 ? activePage + " > " : "";

	        if($(selectorActivePage +  ".header").height() > 0){
                _headerHeight= em * 3 + 14;
			}
			_header={
	        	width:$(selectorActivePage +".header").width() || 0,
	        	height:_headerHeight
            }

            if($(selectorActivePage +".footer").height() > 0){
                _footerHeight= em * 3 + 14;
			}
			
	        _footer={
	        	width:$(selectorActivePage +".footer").width() || 0,
	        	height:_footerHeight
            }
            _content={
	        	width :window.innerWidth,
	            height :window.innerHeight - _header.height - _footer.height - 5
	        }
	        $("body").width(_window.width).height(_window.height);
			$(".content").height(_content.height );
			$(".leftMenu").height(_content.height + _header.height);
			//$(activePage).height(_content.height + _header.height + _footer.height );
	    	
	    	_availHeight= window.innerHeight - _header.height - _footer.height;

	    	$(".centred-verticaly").each(function (i,e) {
	    		if($(e).height() < $(e).parent().height() ){
	    			$(e).css("margin-top", ($(e).parent().height() / 2) - ($(e).height() / 2) );
	    		}
	    	})
	    	$("input, select").change();
			$(".floating-up-left").css({"top":_header.height + (em * 2), "left" : 0});
			$(".floating-up-right").css({"top": _header.height + (em * 2), "left" : _window.width - (em * 2) - 56});
			$(".floating-down-left").css({"top": _window.height - _footer.height  - (em * 4) - 56 , "left" : 0});
			$(".floating-down-right").css({"top": _window.height -  _footer.height - (em * 4) - 56 , "left" : _window.width - (em * 2) - 56});
		},
		list:{
			update:function () {
				$(".lista li").unbind('pointerup');
				$(".lista li").on('pointerup',function (event) {
				$(".lista li").removeClass("li_hover");
					$(this).addClass("li_hover");
				});
			}
		},
		__init : function () {
			if($("#toastArea").length == 0 ){
				$("body").append($("<div>").attr("id","toastArea"));
			}
            $(".leftMenu").height(_content.height + _footer.height);
            $("input, select").unbind("change");
			$("input, select").on("change",function (evt) {
				monomer.__setInputLabelAspect(this);
			})
			$("input, select").unbind("blur");
			$("input, select").on("blur",function (evt) {
				monomer.__setInputLabelAspect(this);
			})
			$('input[type="checkbox"]').each(function (i,chkBox) {
				chkBox.addEventListener("pointerdown",function (event) {
					var el = $(event.currentTarget) 
					el.addClass("icon-spin-down");
					setTimeout(function () {
						el.removeClass("icon-spin-down");
					},200)
				})
			});
			$(".expand-search").unbind("pointerup");
			$(".expand-search").on("pointerup",function () {
				monomer.__expandSearch();
			});
			$(".configMenu").unbind('pointerover');
			$(".configMenu").on('pointerover',function (event) {
								__displayedMenu = false;
							}).on('pointerout',function (event) {
								__displayedMenu = true;
							}).on('pointerup',function (event) {
								setTimeout(function () {
									$(".configMenu").removeClass("configMenu-expanded");
								},500);
							})
			/*$("a , button, input, li, select").each(function (i,btn) {

				$(btn).on("touchstart",function  (event) {
									
					monomer.__touch.addTouch(event)
				})
				$(btn).on("touchend",function (event) {
					monomer.__touch.removeTouch(event)
				})

			})*/
			monomer.list.update();
			$(".modal-backdrop").unbind("click");
			$(".modal-backdrop").on("click",function () {
				monomer.hideDialog();
			})

			$(".leftMenu a").unbind("click");
			$(".leftMenu a").on("click",function () {
				monomer.__hideLeftMenu();
			})
			$(".rightMenu a").unbind("click");
			$(".rightMenu a").on("click",function () {
				monomer.__hideRightMenu();
				
			})

			$(".expand-LeftMenu").unbind("click");
			$(".expand-LeftMenu").on("click",function () {

				monomer.__expandLeftMenu();
				monomer.__setAspect();
			})
			$(".expand-RightMenu").unbind("click");
			$(".expand-RightMenu").on("click",function () {

				monomer.__expandRightMenu();
				monomer.__setAspect();
			})
			$(".expand-Footer").unbind("click");
			$(".expand-Footer").on("click",function () {
				monomer.__expandFooter();
			})
			$(".expand-config").unbind("click");
			$(".expand-config").on("click",function (event) {
				monomer.__expandConfig($(".configMenu"),event)
			})
			
		}
        };
	
	$(function () {
		 FastClick.attach(document.body);
		 $("body").append($("<div>").addClass("_touch"));
		 $("body").append($("<div>").addClass("modal-backdrop").addClass("fade"));
		 $("body").append($("<div>").addClass("loading icon-spinner icon-2x"));
		 $("body").on("touchstart",function (event) {
		 	event = event.originalEvent || event;
	    		pointerdownLeft = event.changedTouches[0].clientX
	    		pointerdownTop = event.changedTouches[0].clientY
	     }) 

	     $(".tabBar").each(function(iT, eT){
	     	var allLi = $(eT).find("li.tab");
	     	var selectedTab = $(eT).find(".selectedTab");
	     	var width = ((99.9 / allLi.length || 1)  ).toString() + "%";
	     	allLi.css("width",width);
	     	selectedTab.css("width",width);
	     })
		 $(".tabBar li.tab").on("click",function(){
		 	var li = $(this);
		 	var ul = $(this).parent();
		 	var tabBar = ul.parent();
		   ul.find(".selectedTab").css("margin-left", parseFloat(li.css("width")) * li.index() + "%")
		   tabBar.find(".tabElement").removeClass("selected");
		   $(tabBar.find(".tabElement")[li.index()]).addClass("selected");
		})
		 $(".tabBar li.tab.selected").each(function(i,e){
		 	var li = $(e);
		 	var ul = $(li).parent();
		 	var tabBar = ul.parent();
		   ul.find(".selectedTab").css("margin-left", parseFloat(li.css("width")) * li.index() + "%")
		   tabBar.find(".tabElement").removeClass("selected");
		   $(tabBar.find(".tabElement")[li.index()]).addClass("selected");

		 })
		 $("body").on("touchend",function (event) {
		 	event = event.originalEvent || event;
		    	pointerdownLeft = pointerdownLeft?pointerdownLeft: 0;
		    	pointerdownTop = pointerdownTop?pointerdownTop: 0;
		    		switch(true){
		    			case(pointerdownLeft - event.changedTouches[0].clientX) > SWIPELONG:{
		    				monomer.__hideLeftMenu();
	                                    }break;
		    			case (pointerdownLeft - event.changedTouches[0].clientX) < -SWIPELONG:{
		    				monomer.__hideRightMenu()
							if (pointerdownLeft < (_window.width /4)) {
		    					monomer.__expandLeftMenu();
		    					
		    				};
		    			}break;	

		    			case(pointerdownTop - event.changedTouches[0].clientY) > SWIPELONG:{
		    				if (pointerdownTop > (_window.height - _footer.height )) {
		    					monomer.__expandFooter();
		    				}
		    			}break;
		    			case (pointerdownTop - event.changedTouches[0].clientY) < -SWIPELONG:{
							if (pointerdownTop < (em * 6)) {
		    					monomer.__hideFooter();
		    				}
		    				
		    			}break;

		    		}
		    });
			$(".content , .header").on("pointerup",function (event) {
				if(__displayedMenu==true){		
					monomer.__hideLeftMenu();
					monomer.__hideRightMenu()
					__displayedMenu= false;
				}
			})
		$(window).on("hashchange",function () {
			
			setTimeout(function () {
				monomer.__init();
				monomer.__setAspect();
			},500);
		});
		setTimeout(function () {
			monomer.__init();
			monomer.__setAspect();
		},500);
		try{
			orientation.onChange(function(m) {
			monomer.__setAspect();
			})
			window.onresize = function(event) {
				monomer.__setAspect();
			};
		}catch(ex){}
		
	});
}());