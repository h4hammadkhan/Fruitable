package com.fruitable.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fruitable.Service.ShipService;
import com.fruitable.Service.UsersOrderService;
import com.fruitable.UserOrderModel.Ship;
import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.fileResponse.ShipPageableResponse;

@RestController
@CrossOrigin("*")
@RequestMapping("/ship")
public class ShipController {
	
	@Autowired
	private ShipService shipService;
	
	@Autowired
	private UsersOrderService orderService;
	
	// add to ship
	@PostMapping("/")
	public Ship addToShip(@RequestBody Ship ship) {
		UsersOrder usersOrder = this.orderService.getOrderById(ship.getUsersOrder().getUsersOrderId());
		usersOrder.setActive(false);
		this.orderService.updateUserOrder(usersOrder);
		return this.shipService.addToShip(ship);
	}
	
	
	// update ship
	@PostMapping("/update")
	public Ship updateShip(@RequestBody Ship ship) {
		return this.shipService.updateShip(ship);
	}
	
	// get all ship details
	@GetMapping("/")
	public ResponseEntity<ShipPageableResponse> getAll(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "15", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "shipId", required = false) String sortBy
	){
		ShipPageableResponse allShip = this.shipService.getAllShip(pageNumber, pageSize, sortBy);
		 
		return new ResponseEntity<ShipPageableResponse>(allShip,HttpStatus.OK);
	}
	
	// get all by code
	@GetMapping("/code/{code}")
	public ResponseEntity<ShipPageableResponse> getAllByCodeAndActive(
			@PathVariable("code") String code,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "15", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "shipId", required = false) String sortBy,
			@RequestParam(value="active", defaultValue = "true", required = false) Boolean active
	){
		ShipPageableResponse allShipBCode = this.shipService.getAllShipByCodeAndActive(code,active, pageNumber, pageSize, sortBy);
		 
		return new ResponseEntity<ShipPageableResponse>(allShipBCode,HttpStatus.OK);
	}
	
	// get by seller user name
	@GetMapping("/seller/{sellerUserName}")
	public ResponseEntity<ShipPageableResponse> getAllByActiveAndSellerUserName(
			@PathVariable("sellerUserName") String sellerUserName,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "15", required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = "shipId", required = false) String sortBy
	){
		ShipPageableResponse allShipBCode = this.shipService.getAllByActiveAndSeller(
				true,sellerUserName, pageNumber, pageSize, sortBy);
		 
		return new ResponseEntity<ShipPageableResponse>(allShipBCode,HttpStatus.OK);
	}
	
	// get by seller user name
	@GetMapping("/unactive/seller/{sellerUserName}")
	public ResponseEntity<ShipPageableResponse> getAllByUnActiveAndSellerUserName(
			@PathVariable("sellerUserName") String sellerUserName,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "15", required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = "shipId", required = false) String sortBy
	){
		ShipPageableResponse allShipBCode = this.shipService.getAllByActiveAndSeller(
				false,sellerUserName, pageNumber, pageSize, sortBy);
		 
		return new ResponseEntity<ShipPageableResponse>(allShipBCode,HttpStatus.OK);
	}
	
	
	// get by ShipID
	@GetMapping("/{shipId}")
	public Ship getByShipId(@PathVariable("shipId") long shipId) {
		return this.shipService.getByShipId(shipId);
	}
	
	// delete 
	@DeleteMapping("/{shipId}")
	public void deleteFormShip(@PathVariable("shipId") long shipId) {
		this.shipService.deleteFromShip(shipId);
	}
	
	
	// complete order
	@PostMapping("/complete")
	public Ship completeOrder(@RequestBody Long shipId) {
		Ship ship = this.shipService.getByShipId(shipId);
		ship.setActive(false);
		return this.updateShip(ship);
	}

}
