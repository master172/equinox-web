import React, { useState } from "react";
import "../Styles/InstitutionRegistration.css";

const EVENTS = {
  "Solo Singing": { maxTeams: 1, participantsPerTeam: 1 },
  "Group Dance": { maxTeams: 3, participantsPerTeam: 6 },
  "Drama Skit": { maxTeams: 2, participantsPerTeam: 10 },
  "Math Olympiad": { maxTeams: 5, participantsPerTeam: 4 },
};

const InstitutionRegistration = () => {
  const [collegeName, setCollegeName] = useState("");
  const [delegate, setDelegate] = useState({
    name: "",
    email: "",
    phone_no: "",
    reg_no: "",
  });
  const [selectedEvents, setSelectedEvents] = useState({});

  // Toggle individual event
  const toggleEvent = (event) => {
    setSelectedEvents((prev) => {
      if (prev[event]) {
        const updated = { ...prev };
        delete updated[event];
        return updated;
      } else {
        return {
          ...prev,
          [event]: Array.from({ length: 1 }, () => ({
            participants: Array.from({ length: EVENTS[event].participantsPerTeam }, () => ({
              name: "",
              email: "",
              phone_no: "",
              reg_no: "",
            })),
          })),
        };
      }
    });
  };

  // Select/Deselect All
  const toggleSelectAll = () => {
    if (Object.keys(selectedEvents).length === Object.keys(EVENTS).length) {
      setSelectedEvents({});
    } else {
      const all = {};
      Object.keys(EVENTS).forEach((event) => {
        all[event] = [
          {
            participants: Array.from(
              { length: EVENTS[event].participantsPerTeam },
              () => ({ name: "", email: "", phone_no: "", reg_no: "" })
            ),
          },
        ];
      });
      setSelectedEvents(all);
    }
  };

  // Add Team
  const addTeam = (event) => {
    setSelectedEvents((prev) => {
      const teams = prev[event];
      if (teams.length < EVENTS[event].maxTeams) {
        return {
          ...prev,
          [event]: [
            ...teams,
            {
              participants: Array.from(
                { length: EVENTS[event].participantsPerTeam },
                () => ({ name: "", email: "", phone_no: "", reg_no: "" })
              ),
            },
          ],
        };
      }
      return prev;
    });
  };

  // Update Participant field
  const updateParticipant = (event, teamIndex, pIndex, field, value) => {
    setSelectedEvents((prev) => {
      const updated = { ...prev };
      updated[event][teamIndex].participants[pIndex][field] = value;
      return updated;
    });
  };

  // Final dictionary (state structure)
  const registrationData = {
    collegeName,
    delegate,
    events: selectedEvents,
  };

  console.log("Current Registration Data:", registrationData);

  return (
    <div className="institution-container">
      <h2 className="page-title">Institution Registration</h2>

      {/* College Name */}
      <div className="input-group">
        <label>College Name</label>
        <input
          type="text"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        />
      </div>

      {/* Head Delegate */}
      <div className="input-group">
        <label>Head Delegate Details</label>
        <div className="delegate-grid">
          <input placeholder="Name" value={delegate.name}
            onChange={(e) => setDelegate({ ...delegate, name: e.target.value })} />
          <input placeholder="Email" value={delegate.email}
            onChange={(e) => setDelegate({ ...delegate, email: e.target.value })} />
          <input placeholder="Phone No" value={delegate.phone_no}
            onChange={(e) => setDelegate({ ...delegate, phone_no: e.target.value })} />
          <input placeholder="Reg No" value={delegate.reg_no}
            onChange={(e) => setDelegate({ ...delegate, reg_no: e.target.value })} />
        </div>
      </div>

      {/* Event Selection */}
      <h3 className="section-title">Select Events</h3>
      <div className="events-list">
        <button onClick={toggleSelectAll} className="event-button select-all">
          {Object.keys(selectedEvents).length === Object.keys(EVENTS).length
            ? "Deselect All"
            : "Select All"}
        </button>
        {Object.keys(EVENTS).map((event) => (
          <button
            key={event}
            onClick={() => toggleEvent(event)}
            className={`event-button ${selectedEvents[event] ? "active" : ""}`}
          >
            {event}
          </button>
        ))}
      </div>

      {/* Selected Events Panels */}
      <div className="selected-events">
        {Object.keys(selectedEvents).map((event) => (
          <div key={event} className="event-panel">
            <h4>{event}</h4>
            {selectedEvents[event].map((team, teamIndex) => (
              <div key={teamIndex} className="team-panel">
                <h5>Team {teamIndex + 1}</h5>
                {team.participants.map((p, pIndex) => (
                  <div key={pIndex} className="participant-panel">
                    <input
                      placeholder="Name"
                      value={p.name}
                      onChange={(e) =>
                        updateParticipant(event, teamIndex, pIndex, "name", e.target.value)
                      }
                    />
                    <input
                      placeholder="Email"
                      value={p.email}
                      onChange={(e) =>
                        updateParticipant(event, teamIndex, pIndex, "email", e.target.value)
                      }
                    />
                    <input
                      placeholder="Phone No"
                      value={p.phone_no}
                      onChange={(e) =>
                        updateParticipant(event, teamIndex, pIndex, "phone_no", e.target.value)
                      }
                    />
                    <input
                      placeholder="Reg No"
                      value={p.reg_no}
                      onChange={(e) =>
                        updateParticipant(event, teamIndex, pIndex, "reg_no", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => addTeam(event)}
              disabled={selectedEvents[event].length >= EVENTS[event].maxTeams}
              className="add-btn"
            >
              + Add Another Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstitutionRegistration;
