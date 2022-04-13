/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const IMG_CHECKED = 'images/checked.png';
const IMG_UNCHECKED = 'images/unchecked.png';
const risposteTest = {};

function resettaTest()
{
   for (const dom of domande)
   {
     dom.classList.remove('unchecked');
     dom.classList.remove('checked');
     const img = dom.querySelector('.checkbox');
     img.src = IMG_UNCHECKED;
     dom.addEventListener('click', check);
   }

   const ris = document.querySelector('#result');
   ris.classList.add('mostra');

   delete risposteTest.one;
   delete risposteTest.two;
   delete risposteTest.three;
}

function check(event)
{
  const container = event.currentTarget;
  const img_check = container.querySelector('.checkbox');
  img_check.src = IMG_CHECKED;

  if(!container.querySelector('.unchecked'))
  {
    container.classList.remove('unchecked');
  }

  container.classList.add('checked');
  uncheck(container.dataset.choiceId, container.dataset.questionId);
  conta();
  risposteTest[container.dataset.questionId] = container.dataset.choiceId; // salvo la risposte nella mappa per calcolare la risposta da stampare 
}

function uncheck(id, num)
{
  for (const dom of domande)
  {
    if(dom.dataset.choiceId != id && dom.dataset.questionId == num)
    {
      dom.classList.add('unchecked');
      dom.classList.remove('checked');
      const img_uncheck = dom.querySelector('.checkbox');
      img_uncheck.src = IMG_UNCHECKED;
    }
  }
}

function elaboraRisultato()
{
  if (risposteTest.one !== risposteTest.two && risposteTest.two !== risposteTest.three && risposteTest.one !== risposteTest.three)
    return risposteTest.one;

  if (risposteTest.one === risposteTest.two || risposteTest.one === risposteTest.three)
    return risposteTest.one;
  
  if (risposteTest.two === risposteTest.three || risposteTest.two === risposteTest.one)
    return risposteTest.two;

  if (risposteTest.three === risposteTest.two || risposteTest.three === risposteTest.one)
    return risposteTest.three;
}

function stampaRisultato()
{
  const risultato = elaboraRisultato();

  const header = document.querySelector('#result h1');
  const testo = document.querySelector('#result p');
  header.textContent = RESULTS_MAP[risultato].title;
  testo.textContent = RESULTS_MAP[risultato].contents;

  const bottone = document.querySelector('button');
  bottone.addEventListener('click', resettaTest);
}

function bloccaRisposte()
{
  for (const dom of domande)
  {
    dom.removeEventListener('click', check);
  }
  const container = document.querySelector('#result');
  container.classList.remove('mostra');
  stampaRisultato();
}

function conta()
{
  let contatoreDomande = 0;
  for(const dom of domande)
  {
    if(dom.className === 'checked')
      contatoreDomande++;
  }
  if (contatoreDomande > 2)
  {
    bloccaRisposte();
  }
}

const domande = document.querySelectorAll('.choice-grid div');
for (const dom of domande)
{
  dom.addEventListener('click', check);
}