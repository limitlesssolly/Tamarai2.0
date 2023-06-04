const translations={
en:{
    signin : "sign in",
    signup:"sign up",
    learnmore: "Learn More",
    aboutus: "About Us",
    english: "English",
    arabic: "Arabic"
},
ar:{
    signin : "تسجيل الدخول",
    signup:"اشترك ",
    learnmore: "تعرف اكتر ",
    aboutus: " تعرف علينا",
    english: "الانجليزية",
    arabic: "العربية"

},

};
const languageSelector=document.querySelector("select");
languageSelector.addEventListener("change",(event)=>{
console.log(event.target.value);

});

const setLanguage=(language)=>{
    const elements=document.querySelectorAll("[data-i18n]");
    console.log(elements);
    elements.forEach((element)=>{
        const translationKey=element.getAttribute('data-i18n');
        console.log(translationKey);
        element.textContent = translations[language][translationKey];
    });
};