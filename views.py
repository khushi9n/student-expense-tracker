from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import Expense, Budget, ExpenseCategory
from .serializers import ExpenseSerializer, BudgetSerializer, ExpenseCategorySerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    @action(detail=False, methods=['GET'])
    def generate_report(self, request):
        # Get the latest budget
        latest_budget = Budget.objects.order_by('-date_set').first()
        budget_amount = latest_budget.amount if latest_budget else 0

        # Calculate total expenses
        total_expenses = Expense.objects.aggregate(total=Sum('amount'))['total'] or 0

        # Calculate expenses by category
        expenses_by_category = Expense.objects.values('category__name').annotate(total=Sum('amount'))

        # Prepare the report data
        report_data = {
            'budget': budget_amount,
            'total_expenses': total_expenses,
            'remaining_budget': budget_amount - total_expenses,
            'expenses_by_category': list(expenses_by_category)
        }

        return Response(report_data, status=status.HTTP_200_OK)

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class ExpenseCategoryViewSet(viewsets.ModelViewSet):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer
