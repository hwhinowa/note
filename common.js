'use strict';

document.addEventListener('DOMContentLoaded', function(){
    includeHTML();
});

// HTML Include
const includeHTML=()=>{
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

// 선택자 객체 지정 함수
const $=(selector)=>{
	let $el = document.querySelectorAll(selector),
		count = $el.length;

	if(count > 1){
		return $el;
	}else if(count == 1){
		return $el[0];
	}else{
		return;
	}
};

// 컨텐츠 뷰어 함수
const goTo=(page)=>{
    let $menu = $('.menu'),
        $box = $('.contents'),
        $prev_con = $('.contents > div'),
        div = document.createElement('div');
        
    div.setAttribute('w3-include-html', './html/'+page+'.html');
    if($prev_con) $prev_con.remove();
    if($box) $box.appendChild(div);

    if($menu.classList.contains('active')){
        $menu.classList.remove('active');
    }

    includeHTML();
}

// class 토글 함수 (부모 객체)
const toggle_class=(node, name, isParent)=>{
    let elem = isParent ? node.parentNode : node;
    if(elem && elem.classList){
        if(elem.classList.contains(name)){
            elem.classList.remove(name);
        }else{
            elem.classList.add(name);
        }
    }
}

const show_box=(box_name)=>{
    let $box = $('.'+box_name+'_box');
    if($box && $box.classList){
        if($box.classList.contains('active')){
            $box.classList.remove('active');
        }else{
            $box.classList.add('active');
        }
    }
}