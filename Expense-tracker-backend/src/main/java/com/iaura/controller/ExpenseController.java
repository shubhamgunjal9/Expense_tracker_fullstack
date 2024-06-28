package com.iaura.controller;

import com.iaura.entity.Expense;
import com.iaura.entity.User;
import com.iaura.repository.ExpenseRepository;
import com.iaura.repository.UserRepository;
import com.iaura.service.ExpenseService;
import com.iaura.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expense")
@CrossOrigin("*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private ExpenseRepository repository;


    @PostMapping("/save")
    public ResponseEntity<String> saveExpense(@RequestBody Expense expense) {
        expenseService.saveExpense(expense);
        return new ResponseEntity<>("object saved", HttpStatus.OK);
    }

    @GetMapping("/getexpense/{id}")
    public ResponseEntity<List<Expense>> getAllExpenses(@PathVariable("id") Long id) {
        User user = userRepository.findById(id).get();
        List<Expense> list = user.getExpenses();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable("id") Long id) {
        expenseService.DeleteExpense(id);
        return new ResponseEntity<>("deleted",HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateExpense(@RequestBody Expense expense,@PathVariable("id") Long id) {
        expenseService.updateExpense(expense,id);
        return new ResponseEntity<>("updated",HttpStatus.OK);
    }
}
