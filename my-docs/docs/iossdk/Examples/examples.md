---
sidebar_position: 1
title: Implementation Examples
---

# iOS SDK Implementation Examples

This page provides practical examples of how to implement the Zeotap iOS SDK in common app scenarios.

## Complete App Integration Example

### AppDelegate Setup

```swift
import UIKit
import ZeotapCollect

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Configure and initialize Zeotap Collect SDK
        setupZeotapSDK()
        
        return true
    }
    
    private func setupZeotapSDK() {
        var collectOptions = CollectOption().writeKey(value: getWriteKeyForEnvironment())
                                          .logging(value: isDebugMode())
                                          .optout(value: false)
                                          .build()
        Collect.initialize(option: collectOptions)
        
        // Set up initial user properties
        setInitialUserProperties()
    }
    
    private func getWriteKeyForEnvironment() -> String {
        #if DEBUG
            return "zt_ios_dev_1234567890abcdef"
        #else
            return "zt_ios_prod_1234567890abcdef"
        #endif
    }
    
    private func isDebugMode() -> Bool {
        #if DEBUG
            return true
        #else
            return false
        #endif
    }
    
    private func setInitialUserProperties() {
        Collect.getInstance()?.setUserProperties([
            "appVersion": Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown",
            "deviceModel": UIDevice.current.model,
            "osVersion": UIDevice.current.systemVersion,
            "installDate": getInstallDate()
        ])
    }
    
    private func getInstallDate() -> String {
        if let installDate = UserDefaults.standard.object(forKey: "app_install_date") as? Date {
            let formatter = DateFormatter()
            formatter.dateFormat = "yyyy-MM-dd"
            return formatter.string(from: installDate)
        } else {
            let installDate = Date()
            UserDefaults.standard.set(installDate, forKey: "app_install_date")
            let formatter = DateFormatter()
            formatter.dateFormat = "yyyy-MM-dd"
            return formatter.string(from: installDate)
        }
    }
}
```

## E-commerce App Example

### Product Catalog Integration

```swift
import UIKit
import ZeotapCollect

class ProductListViewController: UIViewController {
    
    @IBOutlet weak var tableView: UITableView!
    
    var products: [Product] = []
    var category: String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Track screen view
        Collect.getInstance()?.setEventProperties( "Product List Viewed", [
            "category": category,
            "productCount": products.count
        ])
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        // Track time spent on category page
        startTime = Date()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        if let startTime = startTime {
            let timeSpent = Date().timeIntervalSince(startTime)
            Collect.getInstance()?.setEventProperties( "Time Spent on Category", [
                "category": category,
                "timeSpent": timeSpent
            ])
        }
    }
    
    private var startTime: Date?
}

class ProductDetailViewController: UIViewController {
    
    var product: Product!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Track product view
        Collect.getInstance()?.setEventProperties( "Product Viewed", [
            "productId": product.id,
            "productName": product.name,
            "category": product.category,
            "price": product.price,
            "currency": "USD",
            "brand": product.brand,
            "inStock": product.inStock
        ])
    }
    
    @IBAction func addToCartTapped(_ sender: UIButton) {
        // Add to cart logic
        CartManager.shared.addProduct(product)
        
        // Track add to cart event
        Collect.getInstance()?.setEventProperties( "Product Added to Cart", [
            "productId": product.id,
            "productName": product.name,
            "price": product.price,
            "currency": "USD",
            "cartTotal": CartManager.shared.total,
            "cartItemCount": CartManager.shared.itemCount
        ])
        
        // Show confirmation
        showAddToCartConfirmation()
    }
    
    @IBAction func shareTapped(_ sender: UIButton) {
        Collect.getInstance()?.setEventProperties( "Product Shared", [
            "productId": product.id,
            "shareMethod": "iOS Share Sheet"
        ])
        
        // Show share sheet
        showShareSheet()
    }
}
```

### Shopping Cart Integration

```swift
import ZeotapCollect

class CartManager {
    
    static let shared = CartManager()
    private var items: [CartItem] = []
    
    func addProduct(_ product: Product, quantity: Int = 1) {
        if let existingIndex = items.firstIndex(where: { $0.product.id == product.id }) {
            items[existingIndex].quantity += quantity
        } else {
            items.append(CartItem(product: product, quantity: quantity))
        }
        
        // Track cart updated
        Collect.getInstance()?.setEventProperties( "Cart Updated", [
            "action": "add",
            "productId": product.id,
            "quantity": quantity,
            "cartTotal": total,
            "cartItemCount": itemCount
        ])
    }
    
    func removeProduct(_ product: Product) {
        items.removeAll { $0.product.id == product.id }
        
        Collect.getInstance()?.setEventProperties( "Cart Updated", [
            "action": "remove",
            "productId": product.id,
            "cartTotal": total,
            "cartItemCount": itemCount
        ])
    }
    
    var total: Double {
        return items.reduce(0) { $0 + ($1.product.price * Double($1.quantity)) }
    }
    
    var itemCount: Int {
        return items.reduce(0) { $0 + $1.quantity }
    }
}

class CheckoutViewController: UIViewController {
    
    @IBAction func completePurchase(_ sender: UIButton) {
        let orderId = generateOrderId()
        let items = CartManager.shared.items
        
        // Process payment...
        processPayment { [weak self] success in
            if success {
                self?.trackPurchaseCompleted(orderId: orderId, items: items)
                self?.clearCart()
                self?.showPurchaseConfirmation()
            } else {
                self?.trackPurchaseFailed(orderId: orderId, items: items)
                self?.showPurchaseError()
            }
        }
    }
    
    private func trackPurchaseCompleted(orderId: String, items: [CartItem]) {
        let itemsData = items.map { item in
            return [
                "productId": item.product.id,
                "productName": item.product.name,
                "quantity": item.quantity,
                "price": item.product.price,
                "category": item.product.category
            ]
        }
        
        Collect.getInstance()?.setEventProperties( "Purchase Completed", [
            "orderId": orderId,
            "totalAmount": CartManager.shared.total,
            "currency": "USD",
            "itemCount": CartManager.shared.itemCount,
            "items": itemsData,
            "paymentMethod": selectedPaymentMethod,
            "shippingMethod": selectedShippingMethod
        ])
    }
    
    private func trackPurchaseFailed(orderId: String, items: [CartItem]) {
        Collect.getInstance()?.setEventProperties( "Purchase Failed", [
            "orderId": orderId,
            "totalAmount": CartManager.shared.total,
            "currency": "USD",
            "itemCount": CartManager.shared.itemCount,
            "failureReason": "Payment processing failed"
        ])
    }
}
```

## User Authentication Example

```swift
import ZeotapCollect

class AuthenticationManager {
    
    static let shared = AuthenticationManager()
    
    func loginUser(email: String, password: String, completion: @escaping (Bool, User?) -> Void) {
        // Perform login API call
        APIManager.shared.login(email: email, password: password) { [weak self] result in
            switch result {
            case .success(let user):
                self?.handleSuccessfulLogin(user: user)
                completion(true, user)
                
            case .failure(let error):
                self?.handleFailedLogin(email: email, error: error)
                completion(false, nil)
            }
        }
    }
    
    private func handleSuccessfulLogin(user: User) {
        // Set user identities
        Collect.getInstance()?.setUserIdentities([
            "email": user.email,
            "userId": user.id,
            "phoneNumber": user.phoneNumber ?? ""
        ])
        
        // Set user properties
        Collect.getInstance()?.setUserProperties([
            "accountType": user.accountType,
            "signupDate": user.signupDate,
            "isVerified": user.isVerified,
            "subscription": user.subscription,
            "totalOrders": user.totalOrders,
            "lastLoginDate": Date()
        ])
        
        // Track login event
        Collect.getInstance()?.setEventProperties( "User Logged In", [
            "method": "email_password",
            "isFirstTime": user.isFirstTimeLogin
        ])
        
        // Store user session
        UserDefaults.standard.set(user.id, forKey: "current_user_id")
    }
    
    private func handleFailedLogin(email: String, error: Error) {
        Collect.getInstance()?.setEventProperties( "Login Failed", [
            "method": "email_password",
            "error": error.localizedDescription,
            "email": email.isEmpty ? "empty" : "provided"
        ])
    }
    
    func logoutUser() {
        // Clear user session
        UserDefaults.standard.removeObject(forKey: "current_user_id")
        
        // Track logout
        Collect.getInstance()?.setEventProperties( "User Logged Out")
        
        // Clear user identities (optional)
        // Collect.getInstance().clearUserIdentities()
    }
    
    func registerUser(email: String, password: String, userData: [String: Any], completion: @escaping (Bool, User?) -> Void) {
        APIManager.shared.register(email: email, password: password, userData: userData) { [weak self] result in
            switch result {
            case .success(let user):
                self?.handleSuccessfulRegistration(user: user)
                completion(true, user)
                
            case .failure(let error):
                self?.handleFailedRegistration(email: email, error: error)
                completion(false, nil)
            }
        }
    }
    
    private func handleSuccessfulRegistration(user: User) {
        // Set user identities
        Collect.getInstance()?.setUserIdentities([
            "email": user.email,
            "userId": user.id
        ])
        
        // Set initial user properties
        Collect.getInstance()?.setUserProperties([
            "signupDate": Date(),
            "accountType": "free",
            "isVerified": false,
            "signupMethod": "email"
        ])
        
        // Track registration
        Collect.getInstance()?.setEventProperties( "User Registered", [
            "method": "email_password",
            "referralSource": getReferralSource()
        ])
    }
    
    private func handleFailedRegistration(email: String, error: Error) {
        Collect.getInstance()?.setEventProperties( "Registration Failed", [
            "method": "email_password",
            "error": error.localizedDescription
        ])
    }
    
    private func getReferralSource() -> String {
        return UserDefaults.standard.string(forKey: "referral_source") ?? "direct"
    }
}
```

## Content App Example

```swift
import ZeotapCollect

class ArticleViewController: UIViewController {
    
    var article: Article!
    private var readStartTime: Date?
    private var scrollProgress: Double = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Track article view
        Collect.getInstance()?.setEventProperties( "Article Viewed", [
            "articleId": article.id,
            "title": article.title,
            "category": article.category,
            "author": article.author,
            "publishDate": article.publishDate,
            "wordCount": article.wordCount
        ])
        
        readStartTime = Date()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        trackReadingSession()
    }
    
    private func trackReadingSession() {
        guard let startTime = readStartTime else { return }
        
        let readTime = Date().timeIntervalSince(startTime)
        
        Collect.getInstance()?.setEventProperties( "Article Reading Session", [
            "articleId": article.id,
            "readTime": readTime,
            "scrollProgress": scrollProgress,
            "completed": scrollProgress > 0.8
        ])
    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let progress = scrollView.contentOffset.y / (scrollView.contentSize.height - scrollView.frame.height)
        scrollProgress = max(0, min(1, progress))
        
        // Track reading milestones
        if scrollProgress >= 0.25 && !milestones.contains("25%") {
            milestones.insert("25%")
            trackReadingMilestone(milestone: "25%")
        } else if scrollProgress >= 0.50 && !milestones.contains("50%") {
            milestones.insert("50%")
            trackReadingMilestone(milestone: "50%")
        } else if scrollProgress >= 0.75 && !milestones.contains("75%") {
            milestones.insert("75%")
            trackReadingMilestone(milestone: "75%")
        } else if scrollProgress >= 0.90 && !milestones.contains("completed") {
            milestones.insert("completed")
            trackReadingMilestone(milestone: "completed")
        }
    }
    
    private var milestones: Set<String> = []
    
    private func trackReadingMilestone(milestone: String) {
        Collect.getInstance()?.setEventProperties( "Reading Milestone", [
            "articleId": article.id,
            "milestone": milestone,
            "timeToMilestone": Date().timeIntervalSince(readStartTime ?? Date())
        ])
    }
    
    @IBAction func shareArticle(_ sender: UIButton) {
        Collect.getInstance()?.setEventProperties( "Article Shared", [
            "articleId": article.id,
            "shareMethod": "iOS Share Sheet",
            "readProgress": scrollProgress
        ])
        
        showShareSheet()
    }
    
    @IBAction func likeArticle(_ sender: UIButton) {
        Collect.getInstance()?.setEventProperties( "Article Liked", [
            "articleId": article.id,
            "readProgress": scrollProgress
        ])
    }
}
```

## Gaming App Example

```swift
import ZeotapCollect

class GameManager {
    
    static let shared = GameManager()
    private var currentLevel: Int = 1
    private var gameStartTime: Date?
    
    func startGame(level: Int) {
        currentLevel = level
        gameStartTime = Date()
        
        Collect.getInstance()?.setEventProperties( "Game Started", [
            "level": level,
            "gameMode": getCurrentGameMode(),
            "playerLevel": getPlayerLevel()
        ])
    }
    
    func completeLevel(score: Int, stars: Int) {
        guard let startTime = gameStartTime else { return }
        
        let playTime = Date().timeIntervalSince(startTime)
        
        Collect.getInstance()?.setEventProperties( "Level Completed", [
            "level": currentLevel,
            "score": score,
            "stars": stars,
            "playTime": playTime,
            "attempts": getLevelAttempts(level: currentLevel)
        ])
        
        // Update user properties
        Collect.getInstance()?.setUserProperties([
            "highestLevel": max(getPlayerLevel(), currentLevel),
            "totalScore": getTotalScore() + score,
            "totalPlayTime": getTotalPlayTime() + playTime
        ])
    }
    
    func failLevel(reason: String) {
        guard let startTime = gameStartTime else { return }
        
        let playTime = Date().timeIntervalSince(startTime)
        
        Collect.getInstance()?.setEventProperties( "Level Failed", [
            "level": currentLevel,
            "reason": reason,
            "playTime": playTime,
            "attempts": getLevelAttempts(level: currentLevel) + 1
        ])
    }
    
    func purchaseItem(itemId: String, price: Double, currency: String) {
        Collect.getInstance()?.setEventProperties( "In-App Purchase", [
            "itemId": itemId,
            "price": price,
            "currency": currency,
            "playerLevel": getPlayerLevel(),
            "currentLevel": currentLevel
        ])
    }
    
    private func getCurrentGameMode() -> String {
        // Implementation to get current game mode
        return "classic"
    }
    
    private func getPlayerLevel() -> Int {
        return UserDefaults.standard.integer(forKey: "player_level")
    }
    
    private func getLevelAttempts(level: Int) -> Int {
        return UserDefaults.standard.integer(forKey: "level_\(level)_attempts")
    }
    
    private func getTotalScore() -> Int {
        return UserDefaults.standard.integer(forKey: "total_score")
    }
    
    private func getTotalPlayTime() -> TimeInterval {
        return UserDefaults.standard.double(forKey: "total_play_time")
    }
}
```

## Best Practices Summary

1. **Initialize Early**: Set up the SDK in `AppDelegate.application(_:didFinishLaunchingWithOptions:)`

2. **Use Meaningful Event Names**: Choose descriptive, consistent event names

3. **Include Relevant Properties**: Add contextual information to events

4. **Set User Properties**: Update user properties when they change

5. **Handle Different Environments**: Use different configurations for development and production

6. **Track Key User Journey Points**: Focus on important user actions and milestones

7. **Respect Privacy**: Always ensure proper consent before tracking

8. **Test Thoroughly**: Verify events are being sent correctly in development