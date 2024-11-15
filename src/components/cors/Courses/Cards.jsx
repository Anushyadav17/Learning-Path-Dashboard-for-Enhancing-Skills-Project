import Card from "./Card";

const Cards = (props) => {
    let courses = props.courses;
    let loading = props.loading;

    function getCourses() {
        if (!loading) {
            return courses; // Directly return the courses array from the API response
        }
        return []; // Return an empty array if loading is true
    }

    return (
        <div className="cards">
            {
                getCourses().map((course) => (
                    <Card course={course} key={course._id} />
                ))
            }
        </div>
    );
}

export default Cards;
