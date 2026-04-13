package com.traffic.controller;

import com.traffic.model.Incident;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "*")
public class IncidentController {

    private List<Incident> incidents = new ArrayList<>();
    private int incidentCounter = 5;

    public IncidentController() {
        incidents.add(new Incident("INC-001", "MG Road & Brigade Rd", "Accident", "High", "Active", "08:15", "Two-car collision blocking left lane.", 2));
        incidents.add(new Incident("INC-002", "Ring Road East", "Breakdown", "Medium", "Active", "09:30", "Stalled truck causing slowdown.", 1));
        incidents.add(new Incident("INC-003", "Airport Road", "Construction", "Low", "Resolved", "06:00", "Pothole repair.", 0));
        incidents.add(new Incident("INC-004", "Tech Park Junction", "Flooding", "Critical", "Active", "10:45", "Waterlogging after heavy rain.", 3));
    }

    @GetMapping
    public List<Incident> getAllIncidents() {
        return incidents;
    }

    @PostMapping
    public Incident reportIncident(@RequestBody Incident newIncident) {
        String idStr = String.format("INC-%03d", incidentCounter++);
        newIncident.setId(idStr);
        newIncident.setStatus("Active");
        newIncident.setTime(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
        newIncident.setResponders(0);
        
        // Add to the beginning of the list to show newest first
        incidents.add(0, newIncident);
        return newIncident;
    }

    @PutMapping("/{id}/resolve")
    public Incident resolveIncident(@PathVariable String id) {
        Optional<Incident> incidentOpt = incidents.stream().filter(i -> i.getId().equals(id)).findFirst();
        if (incidentOpt.isPresent()) {
            Incident incident = incidentOpt.get();
            incident.setStatus("Resolved");
            return incident;
        }
        return null;
    }
}
