import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData ={
    username: "",
    email: "",
    message: "",
}

export const Contact = () => {

    const [contact, setContact] = useState(defaultContactFormData);

    const [userData, setUserData] = useState(true);
    const { user } = useAuth();

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });
        setUserData(false);
    };

    // lets tackle our handleinput

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             const response = await fetch(`http://127.0.0.1:5000/api/form/contact`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(contact),
             });

             if(response.ok){
               setContact(defaultContactFormData);
               const data = await response.json();
               console.log(data);

               alert("Message send successfully");
             }
        } catch (error) {
            alert("Message not send");
             console.log(error);
        }

    }
    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Contact Us</h1>
                </div>
                {/* contact page main */}
                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img src="/images/contact.png" alt="contact_img" width="500" height="400" />
                    </div>

                    {/* contact form content  */}
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" autoComplete="off" required value={contact.username} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" id="email" autoComplete="off" required value={contact.email} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" cols="30" rows="5" autoComplete="off" required value={contact.message} onChange={handleInput} ></textarea>
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </section>
                </div>
                <section className="mb-3">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14690.84002052548!2d72.58987898389985!3d22.9976889837747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85e0f9d1d869%3A0xfd54397cdbe3dae9!2sH%20%26%20B%20Computer%20Education%20Maninagar!5e0!3m2!1sen!2sin!4v1712572655926!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </section>
            </section>
        </>
    );
};

