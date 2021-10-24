let mylinks = [];
let toggle = document.getElementById('toggle');
let navbar = document.getElementById('navbar');
let short = document.getElementById('short');
let input = document.querySelector('input');
let check = true;
toggle.addEventListener('click',function(){
    if(check)
    {
        navbar.className = "navbar"
        check = false
    }
    else
    {
        navbar.className = ""
        check = true
    }
})
const leadsFromlocalStorage = JSON.parse(localStorage.getItem("links"));
if (leadsFromlocalStorage) {
    mylinks = leadsFromlocalStorage;
  render(mylinks);
}
short.addEventListener('click',shortLink);
function shortLink(){
   let link = input.value;
   if(link.length === 0)
   {
       let div = document.querySelector('.section-2');
       let text = document.querySelector('#ertext');
       div.classList.add('error');
       text.innerHTML = `Please add a link`;
   }
   else{
    let div = document.querySelector('.section-2');
    let text = document.querySelector('#ertext');
    text.innerHTML = "";
    div.classList.remove('error');
    fetch('https://api.shrtco.de/v2/shorten?url='+link)
    .then(
        (apidata)=>{
            return apidata.json();
        
        }).then((actualdata)=>{
    
            return actualdata.result
    
        }).then((getobjdata)=>{
    
            addLink(link,getobjdata.full_short_link);
        })
   }
}
function render(links) {
    let listItems = "";
    for (let i = 0; i < links.length; i++)
      listItems += links[i];
    let div = document.querySelector('.links');
    div.innerHTML = listItems;
  }
function addLink(link,shortlink)
{
       console.log(link);
       console.log(shortlink);
       let content = `<div class="link">
       <div id="link">${link}</div>
       <span>
       <span id="srt">${shortlink}</span>
       <button id="copy" onclick=copy('${shortlink}',this)>Copy</button></span>
        </div>`;
        mylinks.push(content);
        localStorage.setItem("links", JSON.stringify(mylinks))
        render(mylinks);
}
function copy(txt,ref)
{  
   ref.innerHTML = 'Copied!'
   ref.style.background = 'black';
   navigator.clipboard.writeText(txt)
}