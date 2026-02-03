const meds = [
  { id: 'progesterone', name: 'Progesterone (200mg, 300mg)' },
  { id: 'mucinex', name: 'Mucinex (1200mg)' },
  { id: 'nac', name: 'NAC (600mg)' },
  { id: 'p5p', name: 'P5P (qty 1)' },
  { id: 'prenatal', name: 'Prenatal Vitamins (qty 1)' },
  { id: 'vitamind3', name: 'Vitamin D3 (2000 IU)' },
  { id: 'fishoil', name: 'Fish Oil (1200mg)' },
  { id: 'turmeric', name: 'Turmeric Curcumin (2400 mg)' },
  { id: 'amitriptylene', name: 'Amitriptylene (qty 1)' },
  { id: 'primalqueen', name: 'Primal Queen (qty 1)' }
];

const medicationSchedules = [
  {
    id: 'progesterone',
    startRef: 'peak_date',
    startDay: 3,
    endRef: 'peak_date',
    endDay: 12,
    times: ['Night'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'mucinex',
    startRef: 'cycle_start',
    startDay: 7,
    endRef: 'peak_date',
    endDay: 2,
    times: ['Morning', 'Night'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'nac',
    startRef: 'cycle_start',
    startDay: 0,
    endRef: 'cycle_start',
    endDay: 27,
    times: ['Noon', 'Evening', 'Night'],
    daysOfWeek: [1, 3, 5]
  },
  {
    id: 'p5p',
    startRef: 'cycle_start',
    startDay: 0,
    endRef: 'cycle_start',
    endDay: 27,
    times: ['Noon'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'prenatal',
    startRef: 'cycle_start',
    startDay: 0,
    endRef: 'cycle_start',
    endDay: 27,
    times: ['Noon'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'vitamind3',
    startRef: 'cycle_start',
    startDay: 0,
    endRef: 'cycle_start',
    endDay: 27,
    times: ['Noon'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'fishoil',
    startRef: 'cycle_start',
    startDay: 0,
    endRef: 'cycle_start',
    endDay: 27,
    times: ['Morning'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'turmeric',
    startRef: 'cycle_start',
    startDay: 0,
    endRef: 'cycle_start',
    endDay: 27,
    times: ['Evening'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'amitriptylene',
    startRef: 'cycle_start',
    startDay: 0,
    endRef: 'cycle_start',
    endDay: 27,
    times: ['Night'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'primalqueen',
    startRef: 'cycle_start',
    startDay: 0,
    endRef: 'cycle_start',
    endDay: 27,
    times: ['Noon', 'Evening'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  }
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
    const parts = dateStr.split('-');
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    if (isNaN(date)) return ''; // Invalid date safety check

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getDay()];

    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);

    return `${dayName} ${mm}/${dd}/${yy}`;
  }

function populateWeekRow(startDateStr) {
  if (!startDateStr) return;
  
  const parts = startDateStr.split('-');
  const startDate = new Date(parts[0], parts[1] - 1, parts[2]);
  if (isNaN(startDate)) return;
  
  const startDayOfWeek = startDate.getDay();
  
  const headerIds = ['sun-header', 'mon-header', 'tue-header', 'wed-header', 'thu-header', 'fri-header', 'sat-header'];
  const dayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
    // Calculate how many days from the start date to this column's day
    const daysToAdd = (columnIndex - startDayOfWeek + 7) % 7;
    
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + daysToAdd);
    
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(currentDate.getDate()).padStart(2, '0');
    
    const header = document.getElementById(headerIds[columnIndex]);
    if (header) {
      header.textContent = `${dayAbbreviations[columnIndex]} ${mm}/${dd}`;
    }
  }
}




document.addEventListener('DOMContentLoaded', ()=>{
  populateSelect();
  const sel = document.getElementById('med-select');
  sel.addEventListener('change', (e)=>{
    const id = e.target.value;
    if (id) {
      populateMedicationTable(id);
    }
  });



function populateMedicationTable(medId) {
  // Get the medication schedule
  const medSchedule = medicationSchedules.find(m => m.id === medId);
  if (!medSchedule) return;
  
  // Get the dates from inputs
  const startDateInput = document.getElementById('startdateInput');
  const cycstartdateInput = document.getElementById('cycstartdateInput');
  const peakDateInput = document.getElementById('peakdateInput');
  
  if (!startDateInput.value) return; // Need start date for table
  
  // Parse dates
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
  };
  
  const startDate = parseDate(startDateInput.value);
  const cycstartDate = cycstartdateInput.value ? parseDate(cycstartdateInput.value) : null;
  const peakDate = peakDateInput.value ? parseDate(peakDateInput.value) : null;
  
  // Get reference dates for the medication range
  const getRefDate = (ref) => {
    if (ref === 'cycle_start') return cycstartDate;
    if (ref === 'peak_date') return peakDate;
    return null;
  };
  
  const medStartRefDate = getRefDate(medSchedule.startRef);
  const medEndRefDate = getRefDate(medSchedule.endRef);
  
  if (!medStartRefDate) return;
  
  // Calculate the medication's active date range
  const medStartDate = new Date(medStartRefDate);
  medStartDate.setDate(medStartRefDate.getDate() + medSchedule.startDay);
  
  let medEndDate = null;
  if (medEndRefDate) {
    medEndDate = new Date(medEndRefDate);
    medEndDate.setDate(medEndRefDate.getDate() + medSchedule.endDay);
  }
  
  // Get the start day of week for calculating column dates
  const startDayOfWeek = startDate.getDay();
  
  // Time labels
  const timeLabels = ['Morning', 'Noon', 'Evening', 'Night'];
  
  // Get all tbody rows
  const tbody = document.querySelector('.meds-table tbody');
  const rows = tbody.querySelectorAll('tr');
  
  // For each column (0-6 for 7 days)
  for (let colIndex = 0; colIndex < 7; colIndex++) {
    // Calculate the date for this column
    const daysToAdd = (colIndex - startDayOfWeek + 7) % 7;
    const columnDate = new Date(startDate);
    columnDate.setDate(startDate.getDate() + daysToAdd);
    
    // Check if this date is in the medication's range
    const isInRange = (columnDate >= medStartDate) && (!medEndDate || columnDate <= medEndDate);
    
    // Check if this day of week is allowed
    const columnDayOfWeek = columnDate.getDay();
    const isDayOfWeekAllowed = medSchedule.daysOfWeek.includes(columnDayOfWeek);
    
    // For each row (time)
    for (let rowIndex = 0; rowIndex < timeLabels.length; rowIndex++) {
      const cell = rows[rowIndex].cells[colIndex + 1]; // +1 because first cell is time label
      const timeLabel = timeLabels[rowIndex];
      
      // Show X if in range, day of week matches, and time matches, otherwise show -
      if (isInRange && isDayOfWeekAllowed && medSchedule.times.includes(timeLabel)) {
        cell.textContent = 'X';
      } else {
        cell.textContent = '-';
      }
    }
  }
}




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
        populateWeekRow(startdateInput.value);
        const medId = document.getElementById('med-select').value;
        if (medId) populateMedicationTable(medId);
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
        const medId = document.getElementById('med-select').value;
        if (medId) populateMedicationTable(medId);
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
        const medId = document.getElementById('med-select').value;
        if (medId) populateMedicationTable(medId);
      } else {
        peakdateBtn.textContent = 'Select Peak Date';
      }
    });

  } 





});
