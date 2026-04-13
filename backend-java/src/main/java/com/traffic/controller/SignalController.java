package com.traffic.controller;

import com.traffic.model.Signal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/signals")
@CrossOrigin(origins = "*")
public class SignalController {

    private List<Signal> signals = new ArrayList<>();

    public SignalController() {
        signals.add(new Signal("SIG-N1", "North Gate", "North", "green", 45, 1200));
        signals.add(new Signal("SIG-N2", "Tech Park", "North", "red", 15, 800));
        signals.add(new Signal("SIG-S1", "South End", "South", "green", 30, 950));
        signals.add(new Signal("SIG-S2", "Stadium Rd", "South", "yellow", 5, 1100));
        signals.add(new Signal("SIG-E1", "East Blvd", "East", "red", 55, 1500));
        signals.add(new Signal("SIG-E2", "Airport Rd", "East", "green", 20, 2200));
        signals.add(new Signal("SIG-W1", "West End", "West", "red", 10, 600));
        signals.add(new Signal("SIG-W2", "Ring Rd", "West", "green", 40, 1800));
    }

    @GetMapping
    public List<Signal> getAllSignals() {
        return signals;
    }

    @PutMapping("/{id}/state")
    public Signal updateSignalState(@PathVariable String id, @RequestBody Map<String, String> body) {
        Optional<Signal> signalOpt = signals.stream().filter(s -> s.getId().equals(id)).findFirst();
        if (signalOpt.isPresent()) {
            Signal signal = signalOpt.get();
            if (body.containsKey("state")) {
                signal.setState(body.get("state"));
                if ("green".equals(body.get("state"))) signal.setTimer(45);
                else if ("yellow".equals(body.get("state"))) signal.setTimer(5);
                else signal.setTimer(55);
            }
            return signal;
        }
        return null;
    }
}
