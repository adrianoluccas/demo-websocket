package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.Date;

public class OrderSocketDTO {
    private String name;
    private Integer countOrder;
    private String lastUpdate;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getCountOrder() {
		return countOrder;
	}
	public void setCountOrder(Integer countOrder) {
		this.countOrder = countOrder;
	}
	public String getLastUpdate() {
		return lastUpdate;
	}
	public void setLastUpdate(String lastUpdate) {
		this.lastUpdate = lastUpdate;
	}


    
}
