package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.Date;

public class OrderSocketDTO {
    private String name;
    private Integer countOrder;
    private Date lastUpdate;
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
	public Date getLastUpdate() {
		return lastUpdate;
	}
	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

    
}
