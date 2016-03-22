'use strict'

var fs = require('fs')
var path = require('path')


function createQuestion() {
  return {
    type: 'reply',
    tag: 'ios',
    difficulty: '1',
    from: 'http://www.jianshu.com/p/20f8d59eb8fb',
    description: '',
    answer: ''
  }
}
function render(question) {
  let tpl =
    `- type: ${question.type}
- tag: ${question.tag}
- difficulty:  ${question.difficulty}
- from: ${question.from}

--------

${question.description}

---------

${question.answer}
`
  return tpl
}



function main() {
  var file = './data1.txt'
  var content = fs.readFileSync(file, { encoding: 'utf-8' })
  var lines = content.split('\n')
  var index = 0
  var questions = []
  var question = createQuestion();
  var tmp_lines = []
  lines.forEach((line) => {
    if (/^\d+\.\s{1}/g.test(line)) {
      //NEW LINE
      if (question.description !== '') {
        question.answer = tmp_lines.join('\n').replace('答：', '').trim();//去掉·答·
        tmp_lines = []
        questions.push(question)
        question = createQuestion()
        
      }
      question.description = line.replace(/^\d+\.\s{1}/g, '').replace('。', '?').trim()
    } else {
      tmp_lines.push(line)
    }
  })
  //last one
  question.answer = tmp_lines.join('\n').replace('答：', '').trim();//去掉·答·
  questions.push(question)

  questions.forEach((q, index) => {
    fs.writeFileSync('../questions/' + (index+1) + '.md', render(q), { encoding: 'utf-8' })
  })
  
  console.log('done!')
}

main();
