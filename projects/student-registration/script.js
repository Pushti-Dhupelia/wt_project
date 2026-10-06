/**
 * Student Registration Portal Script
 * Real-time ID synchronization & form validation
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentForm');
  const fullName = document.getElementById('fullName');
  const enrollmentNo = document.getElementById('enrollmentNo');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const branch = document.getElementById('branch');
  const semester = document.getElementById('semester');
  const address = document.getElementById('address');
  const recordsTableBody = document.getElementById('recordsTableBody');
  const clearAllBtn = document.getElementById('clearAllBtn');

  // Preview elements
  const previewName = document.getElementById('previewName');
  const previewEnroll = document.getElementById('previewEnroll');
  const previewBranch = document.getElementById('previewBranch');
  const previewSem = document.getElementById('previewSem');
  const previewPhone = document.getElementById('previewPhone');
  const previewCity = document.getElementById('previewCity');

  // Initial dummy data if local storage is empty
  const defaultStudents = [
    {
      name: 'Pushti Dhupelia',
      enrollment: 'IU24CSE102',
      branch: 'Computer Science & Engineering',
      semester: 'Semester 4',
      email: 'pushtidhupelia@gmail.com',
      phone: '9876543210',
      address: 'Ahmedabad, Gujarat'
    },
    {
      name: 'Aarav Shah',
      enrollment: 'IU24CSE105',
      branch: 'Information Technology',
      semester: 'Semester 4',
      email: 'aarav.shah@indusuni.ac.in',
      phone: '9123456789',
      address: 'Ahmedabad, Gujarat'
    }
  ];

  let students = JSON.parse(localStorage.getItem('registered_students')) || defaultStudents;

  // 1. Live ID Card Sync
  const updatePreview = () => {
    previewName.textContent = fullName.value.trim() || 'Student Name';
    previewEnroll.textContent = enrollmentNo.value.trim().toUpperCase() || 'IU24CSE000';
    
    // Shorten branch name for ID badge
    const bVal = branch.value;
    let bShort = 'CSE';
    if (bVal.includes('Information')) bShort = 'IT';
    else if (bVal.includes('AI')) bShort = 'AI/ML';
    else if (bVal.includes('Cyber')) bShort = 'Cyber';
    else if (bVal.includes('Electronics')) bShort = 'ECE';
    previewBranch.textContent = bShort;

    previewSem.textContent = semester.value.replace('Semester ', 'Sem ');
    previewPhone.textContent = phone.value.trim() || '----------';
    
    const addr = address.value.trim();
    previewCity.textContent = addr.split(',')[0] || 'Ahmedabad';
  };

  [fullName, enrollmentNo, email, phone, branch, semester, address].forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
  });

  // Prepopulate preview
  fullName.value = 'Pushti Dhupelia';
  enrollmentNo.value = 'IU24CSE102';
  email.value = 'pushtidhupelia@gmail.com';
  phone.value = '9876543210';
  updatePreview();

  // 2. Render Records Table
  const renderTable = () => {
    recordsTableBody.innerHTML = '';
    if (students.length === 0) {
      recordsTableBody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-records-msg">No students registered yet. Fill out the form above to enroll!</td>
        </tr>
      `;
      return;
    }

    students.forEach((student, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${index + 1}</strong></td>
        <td><strong>${escapeHtml(student.name)}</strong></td>
        <td><code style="background: #eef2ff; color: #4338ca; padding: 2px 6px; border-radius: 4px;">${escapeHtml(student.enrollment)}</code></td>
        <td>${escapeHtml(student.branch)}</td>
        <td>${escapeHtml(student.semester)}</td>
        <td>${escapeHtml(student.email)}</td>
        <td>${escapeHtml(student.phone)}</td>
        <td>
          <button type="button" class="btn-delete-record" data-index="${index}" title="Remove record">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      recordsTableBody.appendChild(tr);
    });

    // Add delete listeners
    document.querySelectorAll('.btn-delete-record').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-index'));
        students.splice(idx, 1);
        localStorage.setItem('registered_students', JSON.stringify(students));
        renderTable();
      });
    });
  };

  renderTable();

  // 3. Clear All Records
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all registered student records?')) {
        students = [];
        localStorage.setItem('registered_students', JSON.stringify(students));
        renderTable();
      }
    });
  }

  // 4. Form Validation & Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    const nameVal = fullName.value.trim();
    if (!nameVal || nameVal.length < 2 || !/^[a-zA-Z\s'-]+$/.test(nameVal)) {
      fullName.classList.add('is-invalid');
      isValid = false;
    } else {
      fullName.classList.remove('is-invalid');
      fullName.classList.add('is-valid');
    }

    // Validate Enrollment
    const enrollVal = enrollmentNo.value.trim();
    if (!enrollVal || enrollVal.length < 5) {
      enrollmentNo.classList.add('is-invalid');
      isValid = false;
    } else {
      enrollmentNo.classList.remove('is-invalid');
      enrollmentNo.classList.add('is-valid');
    }

    // Validate Email
    const emailVal = email.value.trim();
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      email.classList.add('is-invalid');
      isValid = false;
    } else {
      email.classList.remove('is-invalid');
      email.classList.add('is-valid');
    }

    // Validate Phone
    const phoneVal = phone.value.trim();
    if (!phoneVal || !/^\d{10}$/.test(phoneVal)) {
      phone.classList.add('is-invalid');
      isValid = false;
    } else {
      phone.classList.remove('is-invalid');
      phone.classList.add('is-valid');
    }

    // Validate Address
    const addressVal = address.value.trim();
    if (!addressVal) {
      address.classList.add('is-invalid');
      isValid = false;
    } else {
      address.classList.remove('is-invalid');
      address.classList.add('is-valid');
    }

    if (isValid) {
      // Add new student
      const newStudent = {
        name: nameVal,
        enrollment: enrollVal.toUpperCase(),
        branch: branch.value,
        semester: semester.value,
        email: emailVal,
        phone: phoneVal,
        address: addressVal
      };

      students.unshift(newStudent);
      localStorage.setItem('registered_students', JSON.stringify(students));
      renderTable();

      alert(`🎉 Student "${nameVal}" has been registered successfully with Enrollment No: ${enrollVal.toUpperCase()}!`);
      
      // Clear valid indicators
      [fullName, enrollmentNo, email, phone, address].forEach(i => i.classList.remove('is-valid'));
    }
  });

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
