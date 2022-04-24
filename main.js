const TypeWritter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type method
TypeWritter.prototype.type = function() {
    // CURRETN INDEX OF WORD
    const current = this.wordIndex % this.words.length;
    // GET FULL TEXT OF CURRENT WORD
    const fullTxt = this.words[current];

    // CHECK IF DELETING
    if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        //add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = '<span class="txt">'+ this.txt +'<span/>';

    // INITIAL TYPE SPEED
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // IF WORD IS COMPLETE
    if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = 3000;
        // Set delete to true
        this.isDeleting = true;


    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // MOVE TO NEXT WORD
        this.wordIndex++;

        //PAUSE BEFORE START TYPING
        typeSpeed = 500;
    }

    setTimeout(()=> this.type(), typeSpeed);
}

// Init On DOM Load

document.addEventListener('DOMContentLoaded', init);
// INIT APP
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('date-wait');
    // Init TypeWriter
    
    new TypeWritter(txtElement, words, wait);

}
