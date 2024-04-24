let locationV, descriptionV, amenitiesV, pricingV, contactInfoV;

function readFom() {
  let locationV = document.getElementById("location").value;
  let descriptionV = document.getElementById("desc").value;
  let amenitiesV = document.getElementById("amenities").value;
  let pricingV = document.getElementById("pricing").value;
  let contactInfoV = document.getElementById("contact").value;
  console.log(locationV, descriptionV, amenitiesV, pricingV, contactInfoV);
}

document.getElementById("insert").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("menuList/" + contactInfoV)
    .set({
      Location: locationV,
      Descripton: descriptionV,
      Amenities: amenitiesV,
      Pricing: pricingV,
      ContactInfo: contactInfoV,
    });
  alert("Data Inserted");
  document.getElementById("location").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("amenities").value = "";
  document.getElementById("pricing").value = "";
  document.getElementById("contact").value = "";
};

document.getElementById("read").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("menuList/" + contactInfoV)
    .on("value", function (snap) {
      document.getElementById("location").value = snap.val().rollNo;
      document.getElementById("desc").value = snap.val().name;
      document.getElementById("amenities").value = snap.val().gender;
      document.getElementById("pricing").value = snap.val().address;
      document.getElementById("contact").value = snap.val().address;
    });
};

document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("menuList/" + contactInfoV)
    .update({
        Location: locationV,
        Descripton: descriptionV,
        Amenities: amenitiesV,
        Pricing: pricingV,
        // ContactInfo: contactInfoV,
    });
  alert("Data Update");
  document.getElementById("location").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("amenities").value = "";
  document.getElementById("pricing").value = "";
  document.getElementById("contact").value = "";
};
document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("menuList/" + contactInfoV)
    .remove();
  alert("Data Deleted");
  document.getElementById("location").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("amenities").value = "";
  document.getElementById("pricing").value = "";
  document.getElementById("contact").value = "";
};