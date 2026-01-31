const meds = [
  { id: 'aspirin', name: 'Aspirin' },
  { id: 'metformin', name: 'Metformin' },
  { id: 'lisinopril', name: 'Lisinopril' },
  { id: 'atorvastatin', name: 'Atorvastatin' }
];






function populateSelect(){
  const sel = document.getElementById('med-select');
  meds.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = `${m.name}`;
    sel.appendChild(opt);
  });
}


function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date)) return ''; // Invalid date safety check

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getDay()];

    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);

    return `${dayName} ${mm}/${dd}/${yy}`;
  }




document.addEventListener('DOMContentLoaded', ()=>{
  populateSelect();
  const sel = document.getElementById('med-select');
  sel.addEventListener('change', (e)=>{
    const id = e.target.value;
    // selection available via `id` if needed elsewhere
  });








  console.log('All buttons on page:', document.querySelectorAll('button'));
  const startdateBtn = document.getElementById('startdateBtn');

  
  if (startdateBtn) {
    startdateBtn.addEventListener('click', () => {
      const startdateInput = document.getElementById('startdateInput');
      try {
          if (startdateInput.showPicker) {
              startdateInput.showPicker();
          } else {
              startdateInput.click();
          }
      } catch (err) {
          startdateInput.click();
      }
    });
    startdateInput.addEventListener('change', () => {
      if (startdateInput.value) {
        startdateBtn.textContent = `${formatDate(startdateInput.value)}`;
        stardateid = startdateInput.value;
      } else {
        startdateBtn.textContent = 'Select Sstart Date';
      }
    });

  }
  
    if (cycstartdateBtn) {
    cycstartdateBtn.addEventListener('click', () => {
      const cycstartdateInput = document.getElementById('cycstartdateInput');
      try {
          if (cycstartdateInput.showPicker) {
              cycstartdateInput.showPicker();
          } else {
              cycstartdateInput.click();
          }
      } catch (err) {
          cycstartdateInput.click();
      }
    });
    cycstartdateInput.addEventListener('change', () => {
      if (cycstartdateInput.value) {
        cycstartdateBtn.textContent = `${formatDate(cycstartdateInput.value)}`;
        cycstartdateid = cycstartdateInput.value;
      } else {
        cycstartdateBtn.textContent = 'Select Cycle Start Date';
      }
    });

  } 


    if (peakdateBtn) {
    peakdateBtn.addEventListener('click', () => {
      const peakdateInput = document.getElementById('peakdateInput');
      try {
          if (peakdateInput.showPicker) {
              peakdateInput.showPicker();
          } else {
              peakdateInput.click();
          }
      } catch (err) {
          peakdateInput.click();
      }
    });
    peakdateInput.addEventListener('change', () => {
      if (peakdateInput.value) {
        peakdateBtn.textContent = `${formatDate(peakdateInput.value)}`;
        peakdateid = peakdateInput.value;
      } else {
        peakdateBtn.textContent = 'Select Peak Date';
      }
    });

  } 





});
