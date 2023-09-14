class ViewsController {
  index = async (req, res) => {
    res.render("index", {
      title: "Bienvenidos"
    })
  }
  products = async (req, res) => {
    res.render("products", {
      title: "Products"
    })
  }
  notFound = async (req, res) => {
    res.render("notFound")
  }
}

export default ViewsController