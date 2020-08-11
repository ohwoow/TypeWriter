class TypeWriter {
  constructor(textElement, words, wait = 3000) {
    this.textElement = textElement
    this.words = words
    this.wait = wait
    this.wordIndex = 0
    this.text = ''
    this.isDeleting = false
  }

  //Реализуем удаление и написание слова
  type() {
    let speed = 400 //скорость написание слова
    let currentIndex = this.wordIndex % this.words.length //индекс слова в массиве
    let currentWord = this.words[currentIndex] // активное слово

    // Если идет удаление слова
    if (this.isDeleting) {
      speed = speed / 2
      this.text = currentWord.substring(0, this.text.length - 1) // удаляем последние буквы с конца строки
    } else { // если идет набор слова
      speed = 300
      this.text = currentWord.substring(0, this.text.length + 1)
    }

    this.textElement.innerHTML = this.text // выводим слово на страницу

    // если набор слова закончился и слово равняется активному слову в массиве
    if (!this.isDeleting && this.text === currentWord) {
      this.isDeleting = true // переводим режим удаление в активный
      speed = this.wait // ставим задержку перед написанием нового слово
    } else if (this.isDeleting && this.text === '') {
      //если слово закончилось, то идем дальше по массиву
      this.wordIndex++
      this.isDeleting = false
    }

    setTimeout(() => {
      this.type()
    }, speed)
  }
}

// Получаем данные из дата-атрибуто, парсим их и получаем массив

function init() {
  const textElement = document.querySelector('.text')
  let words = JSON.parse(textElement.getAttribute('data-words'))
  let wait = textElement.getAttribute('data-wait')

  new TypeWriter(textElement, words, wait)
      .type()
}

document.addEventListener("DOMContentLoaded", init)