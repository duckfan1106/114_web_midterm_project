AOS.init({ duration: 1000, once: true });

const form = document.getElementById('estimateForm');
const areaInput = document.getElementById('area');
const serviceCheckboxes = document.querySelectorAll('.service-check');
const totalEstimateElement = document.getElementById('totalEstimate');
const successMessage = document.getElementById('successMessage');
const submittedNameElement = document.getElementById('submittedName');
const areaFeedback = document.getElementById('area-feedback');
const serviceFeedback = document.getElementById('service-feedback');

function updateEstimate() {
    const area = parseFloat(areaInput.value) || 0;
    let totalCostPerPing = 0;

    let isServiceSelected = false;
    serviceCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isServiceSelected = true;
            totalCostPerPing += parseInt(checkbox.getAttribute('data-price'));
        }
    });

    const totalEstimate = area * totalCostPerPing;

    totalEstimateElement.textContent = 'NT$ ' + totalEstimate.toLocaleString('zh-TW');

    if (!isServiceSelected) {
        serviceFeedback.style.display = 'block';
    } else {
        serviceFeedback.style.display = 'none';
    }
}

areaInput.addEventListener('input', updateEstimate);
serviceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateEstimate);
});

updateEstimate();

form.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表單預設提交

    let isValid = true;
    
    if (!form.checkValidity()) {
        isValid = false;
    }

    const area = parseFloat(areaInput.value);
    if (isNaN(area) || area < 5) {
        areaInput.classList.add('is-invalid');
        isValid = false;
    } else {
        areaInput.classList.remove('is-invalid');
    }

    let isServiceSelected = Array.from(serviceCheckboxes).some(checkbox => checkbox.checked);
    if (!isServiceSelected) {
         isValid = false;
    }

    if (isValid) {
        form.classList.remove('was-validated'); 
        form.reset(); 
        updateEstimate(); 

        const name = document.getElementById('name').value || "貴賓";
        submittedNameElement.textContent = name;
        
        successMessage.classList.remove('d-none');
        successMessage.classList.add('animate__animated', 'animate__fadeIn');
        
        setTimeout(() => {
            successMessage.classList.remove('animate__animated', 'animate__fadeIn');
            successMessage.classList.add('d-none');
        }, 8000);

    } else {
        form.classList.add('was-validated');
        alert('表單有必填項目未填寫或格式錯誤，請檢查紅框欄位！');
    }
});

const btn = document.getElementById("backToTop");
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }
};
btn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
