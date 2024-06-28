package com.iaura.service.impl;

import com.iaura.entity.Expense;
import com.iaura.entity.User;
import com.iaura.exceptions.UserIsEmptyException;
import com.iaura.repository.ExpenseRepository;
import com.iaura.service.ExpenseService;
import com.iaura.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    @Override
    public void saveExpense(Expense expense) {
        if(expense==null)
            throw new RuntimeException("exepense object is empty");
        else
            repository.save(expense);
    }

    @Override
    public List<Expense> getExpenseBasedOnUserId(Long id) {
        return null;
    }

    @Override
    public void updateExpense(Expense expense, Long id) {
        expense.setId(id);
        repository.save(expense);
    }

    @Override
    public void DeleteExpense(Long id) {
        repository.delete(repository.findById(id).get());
    }
}
