import './main.css'

function Main() {
  return (
    <main className='flex'>
      <section className='flex left-section'>

        <button className='active'>All Projects</button>
        <button>JavaScript</button>
        <button>TypeScript</button>
        <button>React </button>

      </section>
      <section className='flex right-section'>

        {[1, 2, 3].map((project) => (

          <article key={project} className='card'>

            {/* <img width={266} src="./lemon-restaurant-screenshots/Screenshot_8.png" alt="little-lemon" /> */}
            <img width={266} src="./react-portfolio-website/1.jpg" alt="little-lemon" />

            <div style={{ width: "266px" }} className='box'>
              <h1 className='title'>Little Lemon</h1>
              <p className='sub-title'>The Restaurant Website contains a Home Page and A Form That Handles Table Bookings for The Restaurant.</p>

              <div className="flex icons">

                <div className='flex '>
                  <div className="icon-link"></div>
                  <div className="icon-github"></div>
                </div>

                <a className='link flex' href="">
                  more
                  <div className='icon-arrow-right'></div>
                </a>
              </div>
            </div>

          </article>

        ))}

      </section>
    </main>
  )
}

export default Main