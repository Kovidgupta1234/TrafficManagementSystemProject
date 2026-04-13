package com.traffic.model;

public class Signal {
    private String id;
    private String location;
    private String zone;
    private String state;
    private int timer;
    private int volume;

    public Signal() {}

    public Signal(String id, String location, String zone, String state, int timer, int volume) {
        this.id = id;
        this.location = location;
        this.zone = zone;
        this.state = state;
        this.timer = timer;
        this.volume = volume;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getZone() { return zone; }
    public void setZone(String zone) { this.zone = zone; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public int getTimer() { return timer; }
    public void setTimer(int timer) { this.timer = timer; }
    public int getVolume() { return volume; }
    public void setVolume(int volume) { this.volume = volume; }
}
