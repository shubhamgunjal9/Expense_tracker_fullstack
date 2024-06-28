package com.iaura.service;

import com.iaura.entity.Expense;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExpenseService {

    public void saveExpense(Expense expense);

    public List<Expense> getExpenseBasedOnUserId(Long id);

    public void updateExpense(Expense expense,Long id);

    public void DeleteExpense(Long id);


}
