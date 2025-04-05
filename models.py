from django.db import models

class ExpenseCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Expense(models.Model):
    description = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    category = models.ForeignKey(ExpenseCategory, on_delete=models.SET_NULL, null=True, related_name='expenses')

    def __str__(self):
        return f"{self.description} - ${self.amount}"

class Budget(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_set = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Budget: ${self.amount} (set on {self.date_set})"
