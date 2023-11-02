import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const BookService = () => {
    const service = useLoaderData();
    const { title, _id, price, img } = service;
    const {user} = useContext(AuthContext);

    const handleBookService = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const order = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                alert('Service Booked Successfully');
            }
        })


    }

    return (
        <div>
            <h2 className="text-center text-3xl">Book Service: {title}</h2>
            <form onSubmit={handleBookService} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={user?.displayName} placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" name="amount" defaultValue={'$' + price} className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input type="submit" className="btn btn-block btn-primary" value="Order Confirm" />
                </div>
            </form>
        </div>
    );
};

export default BookService;