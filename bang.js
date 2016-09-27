var bottom_cate=document.getElementsByClassName('bottom-cate')[0];//轮播图
var cate_circle=document.getElementsByClassName('cate-circle');
var item=document.getElementsByClassName('item');
var xsj_item=document.getElementsByClassName('xsj-item');
var i=0;
function bottomPicChange(){
	if (i<5) {
		bottom_cate.src='images/'+(i+1)+'.jpg';
		cate_circle[i].style.background='black';
		for(var j=0;j<cate_circle.length;j++){
			if (j!=i) {
				cate_circle[j].style.background='#eee';
			}
		}
		i++;
	}else{
		i=0;
	}
}
var interval=setInterval(bottomPicChange,1000);
for(var k=0;k<cate_circle.length;k++){
	cate_circle[k].index=k;
	cate_circle[k].addEventListener('click',function(){
		bottom_cate.src='images/'+(this.index+1)+'.jpg';
		this.style.background='black';
		for(var j=0;j<cate_circle.length;j++){
			if (j!=i) {
				cate_circle[j].style.background='#eee';
			}
		}
		i=this.index;
	});
	cate_circle[k].addEventListener('onmoudeleave',function(){
		interval=setInterval(bottomPicChange,1000);
	});
}
for(var j=0;j<item.length;j++){
	item[j].onmouseenter=(function(l){
		return function(){
			this.style.background='#185';
			xsj_item[l].style.display='block';
		}
	}(j));
	item[j].onmouseleave=(function(l){
		return function(){
			this.style.background='rgba(0,0,0,0.8)';
			xsj_item[l].style.display='none';

		}
	})(j);
}
var shop_left=document.getElementsByClassName('shop-left')[0];
var shop_left_item=document.getElementsByClassName('shop-left-item')[0];
var next_page=document.getElementsByClassName('next-page')[0];
function createElement(data){
	var product_item=document.createElement('div');
	product_item.className='product-item';
	shop_left_item.appendChild(product_item);
	var pro_img=document.createElement('div');
	pro_img.className='pro-img';
	product_item.appendChild(pro_img);
	var img=document.createElement('img');//图片
	img.className='product-img';
	img.src=data.shop_ico;
	pro_img.appendChild(img);
	var pro_infor=document.createElement('div');
	pro_infor.className='pro-infor';
	product_item.appendChild(pro_infor);
	var shop_product_infor=document.createElement('div');
	shop_product_infor.className='shop-product-infor';
	pro_infor.appendChild(shop_product_infor);
	var h3=document.createElement('h3');
	shop_product_infor.appendChild(h3);
	var a_href=document.createElement('a');//店名
	a_href.innerHTML=data.shop_name;
	h3.appendChild(a_href);
	var spdj=document.createElement('div');
	spdj.innerHTML='店铺等级：';
	spdj.className='spdj';
	shop_product_infor.appendChild(spdj);
	var another_a=document.createElement('a');
	another_a.className='heart-container';
	spdj.appendChild(another_a);
	var score=Number(data.shop_score);
	for(var i=0;i<score;i++){
		var red_heart=document.createElement('span');
		red_heart.className='red-heart' //创建等级的红心
		another_a.appendChild(red_heart);
	}
	var the_item=document.createElement('div');
	the_item.className='the-main';
	the_item.innerHTML='主营：'+data.main;//主营的内容
	pro_infor.appendChild(the_item);
	var shop_address=document.createElement('div');
	shop_address.className='shop-address';
	shop_address.innerHTML="地址: "+data.addr;//店铺的地址
	pro_infor.appendChild(shop_address);
	var pro_guarantee=document.createElement('div');
	pro_guarantee.className='pro-guarantee';
	product_item.appendChild(pro_guarantee);
	var pay=document.createElement('div');//先行赔付
	pay.className='pay';
	pro_guarantee.appendChild(pay);
	var span1=document.createElement('span');
	span1.innerHTML='先行赔付';
	pay.appendChild(span1);
	var tc_sure=document.createElement('div');
	tc_sure.className='tc-sure';
	var span2=document.createElement('span');
	span2.innerHTML='同城帮认证';
	tc_sure.appendChild(span2);
	pro_guarantee.appendChild(tc_sure);
	var rq=document.createElement('div');
	rq.className='rq';
	rq.innerHTML='人气：'+data.shop_visit+'浏览';
	pro_guarantee.appendChild(rq);
	var span3=document.createElement('span');
	span3.className='enter-shop';
	span3.innerHTML='进入店铺';
	product_item.appendChild(span3);
}
var script=document.createElement('script');
var body=document.getElementsByTagName("body")[0];
body.appendChild(script);
script.src='http://localhost:8080/data/1.json';
var data;
function getData(data){
	data=data.shop_data;
	var records=Math.ceil(data.length/5);
	var pro_pages=document.createElement('div');
	pro_pages.className='pro-pages';
	var pages=document.createElement('div');
	pages.className='pages';
	pro_pages.appendChild(pages);
	for(var x=0;x<records;x++){
		var btn=document.createElement('a');
		btn.href='###';
		btn.innerHTML=x;
		btn.index=x;
		createElement(data[x]);
		if (x==0) {
			btn.className='first-page';
			btn.innerHTML='首页';
		}else if (x==1) {
			btn.className='page-number dy-page';
		}else{
			btn.className='page-number';
		}
		if (x>10) {
			btn.style.display='none';
		}
		btn.addEventListener('click',(function(x){
			return function(){
					if (x==1||x==0) {
					shop_left_item.innerHTML='';
					for(var m=0;m<5;m++){
						createElement(data[m]);
					}
				}else if (x>1) {
					shop_left_item.innerHTML='';
					for(var m=(x-1)*5;m<x*5;m++){
						createElement(data[m]);
					}
				}
			}
		}(btn.index)))
		pages.appendChild(btn);
	}
	var btn1=document.createElement('a');
	btn1.className='next-page';
	btn1.innerHTML='下一页';
	pages.appendChild(btn1);
	var btn2=document.createElement('a');
	btn2.className='last-page';
	btn2.innerHTML='尾页';
	pages.appendChild(btn2);
	shop_left.appendChild(pro_pages);
}

