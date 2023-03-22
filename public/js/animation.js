const translations = [
    'Bonjour',
    'Hello',
    'Hola',
    'Chào',
    "Namaste",
    "Bon dia",
    "Mauri"
]
const hello = document.getElementById('hello')
const progress = document.getElementById('progress')
const main = document.getElementById('main')
const bar = document.getElementById('progress-bar')
const sections = document.querySelectorAll('section')
const contact_form = document.querySelector('#contact_form')
const menu_icon = document.querySelector('menu .icon')
const menu_ul = document.querySelector('menu ul')
var language = 0, menu_icon_show = false


menu_icon.addEventListener('click', function(){
    menu_icon_show = !menu_icon_show

    if(menu_icon_show){
        removeLinkHigtlight()
        menu_ul.classList.add('show')
    }
    else{
        menu_ul.classList.remove('show')
    }
})


menu_ul.addEventListener('click', function(e){
    e.stopPropagation()
    e.preventDefault()
})



const sayhello = function(){
    var i = 0
    
    var helloInterval = setInterval(function () {
        hello.innerText = translations[language].slice(0, i)

        if (i == translations[language].length){
            clearInterval(helloInterval)
            return setTimeout(sayhello, 1000)
        }

        i++
    }, 700)

    language = language < translations.length - 1 ? language + 1 : 0
}

sayhello()


bar.style.left = '-2em'

const removeLinkHigtlight = function(miss){
    for(let section of sections){
        if(typeof section != "object") continue
        if(typeof section.getAttribute('data-id') == miss) continue
    
        document.querySelector(`header a[data-id="${section.getAttribute('id')}"]`).classList.remove('active')
    }
}


const updateLinkHighlight = function(){
    for(let section of sections){
        if(typeof section != "object") continue
    
        section.addEventListener('mouseover', function(){
            removeLinkHigtlight(section.getAttribute('id'))
            document.querySelector(`header a[data-id="${section.getAttribute('id')}"]`).classList.add('active')
        })
        section.addEventListener('click', function(e){
            menu_ul.classList.remove('show')
        })
    
        // section.addEventListener('mouseout', function(){
        // })
    }
}

updateLinkHighlight()


const moveTo = function(selector){
    return function(e){
        removeLinkHigtlight()
        e.preventDefault()
        document.querySelector(selector).scrollIntoView({
            behavior: 'smooth'
        });
    }
}

for(let a of document.querySelectorAll('a[data-id]')){
    if(typeof a == 'object')
        a.addEventListener('click', moveTo('#'+a.getAttribute('data-id')))
}

main.addEventListener('scroll', function (event) {
    var scrollPercentage = 100 * this.scrollLeft / (this.scrollWidth - this.clientWidth);
    bar.style.left = `calc(${scrollPercentage}% - 2em)`
})

window.onscroll = function (event) {
    var scrollPercentage = 100 * this.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    bar.style.left = `calc(${scrollPercentage}% - 2em)`
}


contact_form.addEventListener('submit', function(e){
    e.preventDefault()

    fetch('/contact', {
        method: "POST",
        headers:{
            body: new FormData(e.target),
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Merci pour votre message')
    })
    .catch(err => {
        alert('Erreur, message non délivré ! Vous pouvez tout de même me contacter à sandrodaninthe@gmail.com')
    })
})