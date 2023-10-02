class ViewsController {
  index = async (req, res) => {
    res.render("index",{
      title: "Products"
    })
  }
  chat = async (req, res) => {
    res.render("chat", {
      title: "Comunnity Chat"
    })
  }
  notFound = async (req, res) => {
    res.render("notFound")
  }
}

export default ViewsController