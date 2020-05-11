const deleteProduct = btn => {
  const prodId = btn.parentNode.querySelector("[name=productId").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf").value;

  const productElement = btn.closest("article");

  fetch(`/admin/product/${prodId}`, {
    method: "DELETE",
    headers: { "csrf-token": csrf }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      //   productElement.remove(); // does not work in IE
      productElement.parentNode.removeChild(productElement);
    })
    .catch(err => {
      console.log(err);
    });
};
