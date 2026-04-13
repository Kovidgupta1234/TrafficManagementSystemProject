package com.traffic.model;

public class Incident {
    private String id;
    private String location;
    private String type;
    private String severity;
    private String status;
    private String time;
    private String description;
    private int responders;

    public Incident() {}

    public Incident(String id, String location, String type, String severity, String status, String time, String description, int responders) {
        this.id = id;
        this.location = location;
        this.type = type;
        this.severity = severity;
        this.status = status;
        this.time = time;
        this.description = description;
        this.responders = responders;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getResponders() { return responders; }
    public void setResponders(int responders) { this.responders = responders; }
}
