const zorluk = document.getElementById("zorluk")
const tahmin = document.getElementById("tahmin")
const yazi = document.getElementById("yazi")
const btn = document.getElementById("btn")
// const badge = document.getElementsByClassName("badge")[0]
const badge = document.querySelector(".badge")
const yenile = document.getElementById("yenile")
const oncekiker = document.querySelector(".onceki-tahminler")
yenile.style.display = "none"

yenile.addEventListener("click",refresh)
function refresh(){
    location.reload()
}

let random
let hak = 3
btn.disabled = true
tahmin.disabled = true

zorluk.addEventListener("change",function zorlukAyarla(){
    let carpan = Number(zorluk.value)
    random = Math.round(Math.random()*carpan)
    console.log(random)
    btn.disabled = false
    tahmin.disabled = false
    badge.textContent = hak
    document.title = `Tahmin Oyunu ${hak}`
    zorluk.disabled = true
})

btn.addEventListener("click",karsilastir)
tahmin.addEventListener("keydown",function press(e){
    if(e.keyCode == 13)
        karsilastir()
})

function karsilastir(){
    let tahminNum = Number(tahmin.value)
    if(isNaN(tahminNum)){
        yaziHandle("Oyun yalnızca rakam ile oynanır",["text-primary","text-warning"],"text-danger")
    }else{
        let li = document.createElement("li")
        li.textContent = tahminNum
        li.className = "list-group-item"
        oncekiker.append(li)
        hak--
        document.title = `Tahmin Oyunu ${hak}`
        badge.textContent = hak
        if(tahminNum < random){
            yaziHandle("Daha büyük bir sayı gir.",["text-primary","text-warning"],"text-danger")
            li.classList.add("bg-danger")
            btnHandle(["btn-primary","btn-warning"],"btn-danger")
        }else if(tahminNum > random){
            yaziHandle("Daha küçük bir sayı gir.",["text-primary","text-danger"],"text-warning")
            li.classList.add("bg-warning")
            btnHandle(["btn-primary","btn-danger"],"btn-warning")
        }else{
            yaziHandle("Tebrikler KAZANDIN!",["text-primary","text-danger","text-warning"],"text-success")
            li.classList.add("bg-success")
            btnHandle(["btn-primary","btn-warning","btn-danger"],"btn-success",true)
            tahmin.disabled = true
            yenile.style.display = "block"
        }
        if(hak == 0 && random != tahminNum){
            yaziHandle("KAYBETTİN!",["text-warning","text-danger"],"text-secondary")
            btnHandle(["btn-warning","btn-danger"],"btn-secondary",true)
            tahmin.disabled = true
            yenile.style.display = "block"
        }
    }
    tahmin.value = ""
}
function yaziHandle(icerik,kaldirilacak,eklenecek){
    yazi.textContent = icerik
    for(let i of kaldirilacak){
        yazi.classList.remove(i)
    }
    yazi.classList.add(eklenecek)
}
function btnHandle(kaldirilacak,eklenecek,dis=false){
    for(let i of kaldirilacak){
        btn.classList.remove(i)
    }
    btn.classList.add(eklenecek)
    btn.disabled = dis
}