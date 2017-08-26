window.onload = function() {
  waterfull('main','box')
  const dataInt = {"data": [{"src":'img01.jpg'},{"src":'img02.jpg'},{"src":'img03.jpg'},{"src":'img04.jpg'}]}
  window.onscroll = function() {
  	if(checkScrollSlide) {
  	  const oParent = document.getElementById('main')
  	  //将数据块渲染到页面的尾部
  	  for(var i = 0; i < dataInt.data.length; i++){
  	  	const oBox = document.createElement('div')
  	  	oBox.className = 'box'
  	  	oParent.appendChild(oBox)
  	  	const oPic = document.createElement('div')
  	  	oPic.className = 'pic'
  	  	oBox.appendChild(oPic)
  	  	const oImg = document.createElement('img')
  	  	oImg.src = 'images/' + dataInt.data[i].src
  	  	oPic.appendChild(oImg)
  	  	waterfull('main','box')
  	  }
  	}
  }
  window.onresize = function(){
  	waterfull('main','box')
  }
}

function waterfull(parent,box) {
  //获取main下的class为box的元素
  const oParent = document.getElementById('main')
  const oBoxs = getByClass(oParent,box)
  //计算整个页面显示的列数
  const oBoxW = oBoxs[0].offsetWidth
  const cols = Math.floor(document.documentElement.clientWidth/oBoxW)
  //设置main的宽度
  oParent.style.cssText = 'width:' + oBoxW*cols + 'px;margin: 0 auto'
  const hArr = [] //存放每一列的高度
  for(var i = 0; i < oBoxs.length; i++) {
  	if(i < cols) {
  	  hArr.push(oBoxs[i].offsetHeight)
  	} else {
  	  const minH = Math.min.apply(null,hArr)
  	  const index = getMinhIndex(hArr,minH)
  	  oBoxs[i].style.position = 'absolute' 
  	  oBoxs[i].style.left = index * oBoxW + 'px'
  	  oBoxs[i].style.top = minH + 'px'
  	  hArr[index] = minH + oBoxs[i].offsetHeight
  	}
  }
}
//class获取元素
function getByClass(oParent,clsName) {
  const boxArr = [] //存储class为box的所有元素
  const oElements = document.getElementsByTagName('*')
  for(var i = 0; i < oElements.length; i++) {
  	if(oElements[i].className == clsName) {
  	  boxArr.push(oElements[i])
  	}
  }
  return boxArr
}
//获取每列最小值的下标
function getMinhIndex(arr,val) {
  for(var i in arr) {
  	if(arr[i] == val) {
  	  return i
  	}
  }
}

//
function checkScrollSlide() {
  const oParent = document.getElementById('main')
  const oBoxs = getByClass(oParent,'box')
  const lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight/2)
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.body.clientHeight || document.documentElement.clientHeight
  return (lastBoxH < scrollTop + height)?true:false
}