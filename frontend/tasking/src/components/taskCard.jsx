const priorityColorSelector = (priority) => {
  if (priority.toLowerCase() === "low") {
    return { color: "red" };
  } else if (priority.toLowerCase() === "medium") {
    return { color: "blue" };
  } else if (priority.toLowerCase() === "high") {
    return { color: "green" };
  }
};

const TaskCard = ({ title, description, priority, dueDate }) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="card card-block card-stretch card-height card-bottom-border-info note-detail">
        <div className="card-header d-flex justify-content-between pb-1">
          <div className="icon iq-icon-box-2 icon-border-info rounded">
            <svg
              width="23"
              height="23"
              className="svg-icon"
              id="iq-main-01"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="card-header-toolbar d-flex align-items-center">
            <div className="dropdown">
              <span
                className="dropdown-toggle dropdown-bg"
                id="note-dropdownMenuButton4"
                data-toggle="dropdown"
                aria-expanded="false"
                role="button"
              >
                <i className="ri-more-fill"></i>
              </span>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="note-dropdownMenuButton4"
              >
                <a
                  href="#"
                  className="dropdown-item edit-note1"
                  data-toggle="modal"
                  data-target="#edit-note1"
                >
                  <i className="las la-pen mr-3"></i>Edit
                </a>
                <a
                  className="dropdown-item"
                  data-extra-toggle="delete"
                  data-closest-elem=".card"
                  href="#"
                >
                  <i className="las la-trash-alt mr-3"></i>Delete
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body rounded">
          <h4 className="card-title">{title}</h4>
          <p className="mb-3 card-description short">{description}</p>
        </div>
        <div className="card-footer">
          <div className="d-flex align-items-center justify-content-between note-text note-text-info">
            <a href="#" className="" style={priorityColorSelector(priority)}>
              <i className="las la-user-friends mr-2 font-size-20"></i>
              {priority}
            </a>
            <a href="#" className="">
              <i className="las la-calendar mr-2 font-size-20"></i>
              {dueDate}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
