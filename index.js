function onstart(){
    document.getElementById('status').innerHTML = '';
    document.getElementById('location').innerHTML = '';
    fetch('./api.json')
    .then( res => res.json())
    .then(api => {
        key = api.key;
    });
}

var city =""

var key = null;

var stop = false;

function set(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}
var random=set(100,500);

async function sendip(ev){
    ev.preventDefault();
    const IP = document
    .getElementById('ip').value;

    onstart();

    fetch('https://extreme-ip-lookup.com/json/'+IP+'?key='+key)
    .then( res => res.json())
    .then(response => {
        console.log("Country: ", response.city);
        city = response.city
    })
    .catch((data, status) => {
        console.log('Request failed');
        stop = true;
    })

    if(stop == false){
        document.getElementById('location').innerHTML = 'Loading...';

        setTimeout(function(){
            document.getElementById('loading').style.opacity = '1';
            document.getElementById('location').innerHTML = 'Location : '+ city;
            move();
        },5000);

        setTimeout(function(){
            document.getElementById('loading').style.opacity = '0';
            document.getElementById('status').innerHTML = 'Success !';

            setTimeout(function(){
                window.open('https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000030939443/');
                var audio = new Audio('./sound.mp3');
                audio.play();
                document.body.style.backgroundImage = "url('https://media.makeameme.org/created/youve-been-trolled-k5g4hx.jpg')";
            },17000)

        },15500)

    }
    else{
        document.getElementById('status').innerHTML = 'Request failed !';
    }


};

function move() {
    var elem = document.getElementById("myBar");   
    var width = 1;
    var id = setInterval(frame, random);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
      }
    }
}
