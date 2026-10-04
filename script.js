const books = [
  {title:"The God of Small Things", author:"Arundhati Roy", price:"₹40", found:"1999", shelf:"BOTTOM / LEFT", note:"Someone underlined every sentence about trains.", story:"The blue ink starts on page 17 and ends exactly where the twins first hear a train. Nobody knows who wrote it.", cover:"linear-gradient(150deg,#50604b,#263127)"},
  {title:"A Man Called Ove", author:"Fredrik Backman", price:"₹70", found:"2014", shelf:"MIDDLE / RIGHT", note:"Bought after a fight.", story:"On the first page: “For R.” On the last page: “Still angry. Still here.” The buyer never returned for it.", cover:"linear-gradient(150deg,#8a7656,#4b4031)"},
  {title:"Sapiens", author:"Yuval Noah Harari", price:"₹120", found:"2018", shelf:"TOP / LEFT", note:"Exam notes in the margins.", story:"Three chapters are covered in tiny pencil calculations. A date at the bottom says 12 May 2018 — two days before an entrance exam.", cover:"linear-gradient(150deg,#9d855e,#6b543a)"},
  {title:"Wings of Fire", author:"A. P. J. Abdul Kalam", price:"₹80", found:"2007", shelf:"MIDDLE / CENTRE", note:"A name crossed out.", story:"The name on the inside cover has been scratched away so hard that the paper is thin. Under it, in blue ink: “Don't forget where you started.”", cover:"linear-gradient(150deg,#3e4d5a,#202b31)"},
  {title:"The Alchemist", author:"Paulo Coelho", price:"₹50", found:"2001", shelf:"BOTTOM / RIGHT", note:"Returned three times.", story:"Mishraji says the same copy was bought by three different people over fifteen years. The fourth owner never brought it back.", cover:"linear-gradient(150deg,#a45d36,#653622)"},
  {title:"Ikigai", author:"Héctor García", price:"₹60", found:"2020", shelf:"TOP / RIGHT", note:"A train timetable inside.", story:"Folded between chapters 4 and 5 is a timetable from the station. Platform 2 is circled in red. The train left at 06:45.", cover:"linear-gradient(150deg,#6e7b76,#38413e)"},
  {title:"The Namesake", author:"Jhumpa Lahiri", price:"₹90", found:"2005", shelf:"BOTTOM / CENTRE", note:"A phone number, no name.", story:"Seven digits are written on the back cover. The number no longer works. The ink has faded almost completely.", cover:"linear-gradient(150deg,#7b5d4a,#44362e)"},
  {title:"Malgudi Days", author:"R. K. Narayan", price:"₹45", found:"1994", shelf:"TOP / CENTRE", note:"The oldest one here.", story:"The receipt tucked inside is dated 3 August 1994. Mishraji remembers the customer: “A schoolboy. Very serious fellow.”", cover:"linear-gradient(150deg,#80684b,#4c3c2b)"}
];

const booksEl = document.getElementById("books");
const noteEl = document.getElementById("bookNote");
const countEl = document.getElementById("bookCount");
let selected = 0;

function renderBooks(){
  booksEl.innerHTML = "";
  books.forEach((book,i)=>{
    const el=document.createElement("button");
    el.type="button";
    el.className="book"+(i===selected?" selected":"");
    el.setAttribute("role","listitem");
    el.setAttribute("aria-label",`${book.title} by ${book.author}`);
    el.style.background=book.cover;
    el.innerHTML=`<span class="book-title">${book.title}</span><span class="book-author">${book.author}</span>`;
    el.addEventListener("click",()=>selectBook(i,true));
    booksEl.appendChild(el);
  });
  updateNote();
}
function updateNote(){
  const b=books[selected];
  countEl.textContent=`${selected+1} / ${books.length}`;
  noteEl.innerHTML=`<span class="note-number">BOOK #${String(selected+41).padStart(3,"0")}</span>
    <h3>${b.title}</h3><p><b>${b.price}</b></p><p>FOUND: ${b.found}</p><p>SHELF: ${b.shelf}</p>
    <p style="margin-top:20px">NOTE:</p><p>“${b.note}”</p>`;
  [...booksEl.children].forEach((el,i)=>el.classList.toggle("selected",i===selected));
}
function selectBook(i,open=false){
  selected=(i+books.length)%books.length; updateNote();
  booksEl.children[selected]?.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});
  if(open) openDialog(books[selected]);
}
document.getElementById("prevBook").addEventListener("click",()=>selectBook(selected-1));
document.getElementById("nextBook").addEventListener("click",()=>selectBook(selected+1));
document.addEventListener("keydown",e=>{
  if(document.activeElement?.closest(".shelf-section") || document.activeElement===document.body){
    if(e.key==="ArrowLeft") selectBook(selected-1);
    if(e.key==="ArrowRight") selectBook(selected+1);
  }
});

const dialog=document.getElementById("bookDialog");
function openDialog(b){
  document.getElementById("dialogTitle").textContent=b.title;
  document.getElementById("dialogAuthor").textContent=b.author;
  document.getElementById("dialogStory").textContent=b.story;
  document.getElementById("dialogMeta").innerHTML=`<span>${b.price}</span><span>FOUND ${b.found}</span><span>${b.shelf}</span>`;
  if(typeof dialog.showModal==="function") dialog.showModal();
}
document.getElementById("closeDialog").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});

renderBooks();

const form=document.getElementById("campaignForm");
const count=document.getElementById("supportCount");
const message=document.getElementById("formMessage");
form.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  if(!name)return;
  const current=parseInt(count.textContent.replace(/,/g,""),10)+1;
  count.textContent=current.toLocaleString("en-IN");
  message.textContent=`Thank you, ${name}. Your name is pinned to the stall.`;
  form.reset();
});

const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduced){
  const reveal=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("in-view");reveal.unobserve(entry.target)}
    })
  },{threshold:.08});
  document.querySelectorAll(".story-copy,.story-art,.paper-sheet,.train-sketch").forEach(el=>{
    el.style.opacity="0";el.style.transform+=" translateY(18px)";
    el.style.transition="opacity .7s ease, transform .7s ease";reveal.observe(el);
  });
  const style=document.createElement("style");
  style.textContent=".in-view{opacity:1!important;transform:translateY(0) rotate(var(--r,0))!important}";
  document.head.appendChild(style);
}
