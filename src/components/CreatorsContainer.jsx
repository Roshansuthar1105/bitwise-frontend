import { useAuth } from "../store/auth";

const CreatorsContainer = ({count}) => {
    const {coursesData} = useAuth();
    const topCreators = [...new Map(coursesData.map(course => [course.creator_name, course])).values()];

    return (<div className="creators-grid">
        {/* Filter unique creators and map through them */}
        {topCreators.slice(0, count).map((course, index) => (
          <div key={index} className="creator-card">
            <img 
              src={course.creator_image} 
              alt={course.creator_name} 
              className="creator-avatar"
            />
            <h3>{course.creator_name}</h3>
            <a 
              href={course.creator_youtube_link}
              target="_blank" 
              rel="noopener noreferrer"
              className="creator-link"
            >
              View Channel
            </a>
          </div>
        ))}
      </div>
    )
}

export default CreatorsContainer;