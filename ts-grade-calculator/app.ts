const render = (
  type: string,
  text?: string | null,
  id?: string,
  position?: any
) => {
  const elem = document.createElement(type);
  if (text) elem.innerText = text;
  if (id) elem.id = id;
  if (position) {
    position.appendChild(elem);
  } else document.body.appendChild(elem);
}

const gradecount = document.querySelector('input')! as HTMLInputElement;
const submitBtn = document.querySelector('button')! as HTMLButtonElement;
const gradefield = document.querySelector('div')! as HTMLDivElement;
const resultfield = document.getElementById('result')! as HTMLDivElement;

submitBtn.onclick = () => {
  if (isNaN(+gradecount.value)) {
    return alert("That is not a number!");
  } else if (+gradecount.value <= 0) {
    return alert("Can't be smaller than or equal to 0!");
  }
  gradecount.remove(), submitBtn.remove()
  for (let i = 1; i < +gradecount.value + 1; i++) {
    render('input', null, `grade${i}`, gradefield);
    const grade = document.getElementById(`grade${i}`)! as HTMLInputElement;
    grade.placeholder = `Grade ${i}`;
  }
  render("button", "Calculate", 'calc', gradefield);
  const calcBtn = document.getElementById('calc');
  calcBtn.onclick = () => {
    const grades = document.querySelectorAll('input');
    let result: number;
    let total = 0;
    for (const grade of grades as any) {
      if (isNaN(+grade.value)) return alert("Whoops, you haven't entered a number!")
      total += +grade.value;
    }
    result = Math.floor(total / +gradecount.value);
    render('h1', `Your score average is ${result}`, 'result', resultfield);
    document.getElementById('result').classList.add('animate__animated', 'animate__bounceInUp');
    render('button', 'Refresh', 'refresh');
    document.getElementById('refresh').onclick = () => window.location.reload();
  }
}