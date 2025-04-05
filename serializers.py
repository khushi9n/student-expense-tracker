from rest_framework import serializers
from .models import Expense, Budget, ExpenseCategory

class ExpenseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = ['id', 'name', 'description']

class ExpenseSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    category = ExpenseCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=ExpenseCategory.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Expense
        fields = ['id', 'description', 'amount', 'date', 'category', 'category_id']

class BudgetSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Budget
        fields = ['id', 'amount', 'date_set']
