axios.post(API_ROUTES.CREATE_PRODUCT, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
})
.then(response => {
    console.log("Product created:", response.data);
    // Add navigation or other success actions here, like resetting form or displaying success message
})
.catch(error => {
    console.error("Error creating product:", error);
    const feedbackElement = document.querySelector('.feedback');
    if (feedbackElement) {
        feedbackElement.innerText = "Error creating product. Please try again.";
    }
});