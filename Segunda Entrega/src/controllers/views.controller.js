class ViewsController {
  index = async (req, res) => {
    res.render("index",{
      title: "Studends"
    })
  }
  notFound = async (req, res) => {
    res.render("notFound")
  }
}

export default ViewsController