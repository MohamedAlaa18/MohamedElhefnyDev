import './contact.css'

function Contact() {
  return (
    <section className='contact-us'>
      <h1 className='title'>
        <span className='icon-envelope'></span>
        Contact us
      </h1>
      <p className='sub-title'>Contact us for more information and get notified when i publish something new.</p>

      <div className="flex">
        <form>
          <div className='flex'>
            <label htmlFor="email">Email Address:</label>
            <input type="email" name="" id="email" required/>
          </div>

          <div className='flex'>
            <label htmlFor="message">Your message:</label>
            <textarea name="" id="message" required></textarea>
          </div>

          <button className='submit'>Submit</button>
        </form>
        <div className="animation"></div>
      </div>
    </section>
  )
}

export default Contact