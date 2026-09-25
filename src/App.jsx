import { useState } from "react";

export default function App() {
    const [studies, setStudies] = useState([]);

    function addStudy(newStudy) {
        setStudies((studies) => [...studies, newStudy]);
    }

    function deleteStudy(id) {
        setStudies((studies) =>
            studies.filter((study) => study.id !== id)
        );
    }

    const totalHours = studies.reduce(
        (total, study) => total + Number(study.hours),
        0
    );

    const averageHours =
        studies.length > 0
            ? totalHours / studies.length
            : 0;

    return (
        <div className="app">
            <Header studyCount={studies.length} />

            <main className="main">
                <div className="top-section">
                    <StudyForm onAddStudy={addStudy} />

                    <StudySummary
                        studies={studies}
                        totalHours={totalHours}
                        averageHours={averageHours}
                    />
                </div>

                <StudyList
                    studies={studies}
                    onDeleteStudy={deleteStudy}
                />
            </main>
        </div>
    );
}

function Header({ studyCount }) {
    return (
        <header className="header">
            <div className="brand">
                <div className="brand-icon">📚</div>

                <div>
                    <h1>StudyHub</h1>
                    <p>Plan your study. Improve your future.</p>
                </div>
            </div>

            <div className="header-count">
                <span>SUBJECTS</span>
                <strong>{studyCount}</strong>
            </div>
        </header>
    );
}

function StudyForm({ onAddStudy }) {
    const [name, setName] = useState("");
    const [hours, setHours] = useState("");
    const [error, setError] = useState("");

    function handleAdd() {
        if (name.trim() === "" || hours.trim() === "") {
            setError("Please enter the subject and study hours.");
            return;
        }

        const newStudy = {
            id: Date.now(),
            name: name,
            hours: hours
        };

        onAddStudy(newStudy);

        setName("");
        setHours("");
        setError("");
    }

    return (
        <section className="form-card">
            <div className="form-heading">
                <span className="form-label">
                    STUDY PLANNER
                </span>

                <h2>Add a new subject</h2>

                <p>
                    Create a study plan and track your
                    learning hours.
                </p>
            </div>

            <div className="form-fields">
                <div className="input-group">
                    <label>Subject Name</label>

                    <input
                        type="text"
                        placeholder="e.g. React"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                </div>

                <div className="input-group">
                    <label>Study Hours</label>

                    <input
                        type="number"
                        placeholder="e.g. 5"
                        value={hours}
                        onChange={(e) =>
                            setHours(e.target.value)
                        }
                    />
                </div>

                <button
                    className="add-button"
                    onClick={handleAdd}
                >
                    <span>＋</span>
                    Add Subject
                </button>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}
            </div>
        </section>
    );
}

function StudySummary({
    studies,
    totalHours,
    averageHours
}) {
    return (
        <section className="summary-card">
            <div className="summary-title">
                <div>
                    <span>YOUR PROGRESS</span>
                    <h2>Study Overview</h2>
                </div>

                <div className="summary-icon">
                    ↗
                </div>
            </div>

            <div className="summary-main">
                <div className="big-number">
                    {totalHours}
                </div>

                <div>
                    <strong>Total Hours</strong>
                    <p>planned for your studies</p>
                </div>
            </div>

            <div className="stats">
                <div className="stat">
                    <span>SUBJECTS</span>
                    <strong>{studies.length}</strong>
                </div>

                <div className="stat">
                    <span>AVERAGE</span>
                    <strong>
                        {averageHours.toFixed(1)}h
                    </strong>
                </div>
            </div>
        </section>
    );
}

function StudyList({ studies, onDeleteStudy }) {
    return (
        <section className="list-card">
            <div className="list-header">
                <div>
                    <span>MY STUDIES</span>
                    <h2>Study Subjects</h2>
                </div>

                <div className="list-count">
                    {studies.length} subjects
                </div>
            </div>

            {studies.length === 0 ? (
                <div className="empty">
                    <div className="empty-icon">
                        📖
                    </div>

                    <h3>No subjects yet</h3>

                    <p>
                        Add your first subject to start
                        planning your study.
                    </p>
                </div>
            ) : (
                <div className="study-list">
                    {studies.map((study) => (
                        <StudyItem
                            key={study.id}
                            study={study}
                            onDeleteStudy={onDeleteStudy}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function StudyItem({ study, onDeleteStudy }) {
    let type = "";

    if (Number(study.hours) >= 5) {
        type = "🔥 Intensive Study";
    } else {
        type = "📖 Normal Study";
    }

    return (
        <div className="study-item">
            <div className="subject-icon">
                📘
            </div>

            <div className="subject-info">
                <h3>{study.name}</h3>

                <span>{type}</span>
            </div>

            <div className="hours">
                <strong>{study.hours}</strong>
                <small>hours</small>
            </div>

            <button
                className="delete-button"
                onClick={() =>
                    onDeleteStudy(study.id)
                }
            >
                ×
            </button>
        </div>
    );
}