async function predict() {
  const fields = [
    'LIMIT_BAL',
    'SEX',
    'EDUCATION',
    'MARRIAGE',
    'AGE',
    'PAY_0',
    'PAY_2',
    'PAY_3',
    'PAY_4',
    'PAY_5',
    'PAY_6',
    'BILL_AMT1',
    'BILL_AMT2',
    'BILL_AMT3',
    'BILL_AMT4',
    'BILL_AMT5',
    'BILL_AMT6',
    'PAY_AMT1',
    'PAY_AMT2',
    'PAY_AMT3',
    'PAY_AMT4',
    'PAY_AMT5',
    'PAY_AMT6',
  ]
  const data = {}
  fields.forEach((f) => (data[f] = parseFloat(document.getElementById(f).value)))

  try {
    const res = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    document.getElementById('error').style.display = 'none'
    const el = document.getElementById('result')
    el.style.display = 'block'
    el.className = 'result ' + (json.prediction === 'Дефолт' ? 'default' : 'no-default')
    document.getElementById('verdict').textContent = json.prediction
    document.getElementById('prob').textContent = `Вероятность дефолта: ${(
      json.probability * 100
    ).toFixed(1)}%`
    const riskEl = document.getElementById('risk')
    riskEl.textContent = `Уровень риска: ${json.risk_level}`
    riskEl.className =
      'risk ' +
      (json.risk_level === 'Высокий'
        ? 'risk-high'
        : json.risk_level === 'Средний'
        ? 'risk-med'
        : 'risk-low')
  } catch (e) {
    document.getElementById('error').style.display = 'block'
  }
}
